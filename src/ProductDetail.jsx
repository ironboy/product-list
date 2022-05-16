import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from "react-router-dom";
import { add } from './utilities/shoppingCartLogic';
import { sweFormat } from './utilities/currencyFormatter';
import { useEffect } from 'react';
import { missingImage } from './utilities/handleMissingImage';

export default function ProductDetail() {

  let s = useStates('main');

  // A local state for this component
  // with one property/state var - buyQuantity
  let localState = useStates({
    buyQuantity: 1
  });

  // Set the buyQuantity to 1 when the component mounts / "page load"
  useEffect(() => {
    localState.buyQuantity = 1;
  }, []);

  // Find the product
  let { id } = useParams();
  let product = s.products.find(x => x.id === +id);
  if (!product) { return null; }

  let { name, description, price, categoryId } = product;

  // Find the category
  let categoryName = s.categories.find(category =>
    category.id === categoryId
  )?.name || 'none';

  let navigate = useNavigate();

  function buy() {
    // Add the product to the cart
    add(product, localState.buyQuantity);
    // Show the cart
    navigate('/shopping-cart');
  }

  return <Container className="productList">
    <Row><Col>
      <Link to={`/product-list`}>
        <button type="button" className="my-4 btn btn-primary">Back to list</button>
        <hr />
      </Link>
    </Col></Row>
    <Row><Col><h1 className="mb-2">{name}</h1></Col></Row>
    <Row className="mb-3"><Col><h4>Category: {categoryName}</h4></Col></Row>
    <Row><Col>
      <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 250, height: 150, objectFit: 'cover' }} src={`/images/products/${id}.jpg`} />
      <p>{description}</p>
    </Col></Row>
    <Row><Col><p>Price: {sweFormat(price)}</p></Col></Row>
    <Row><Col>
      <Link to={`/product-edit/${id}`}>
        <button type="button" className="my-4 btn btn-primary float-end">Edit</button>
      </Link>
    </Col></Row>
    <Row><Col className="mt-2">
      <button type="button" onClick={buy} className="btn btn-primary float-end">Buy</button>
      <input style={{ width: 100 }} className="float-end mt-1 me-3" type="number" {...localState.bind('buyQuantity')} />
    </Col></Row>
  </Container>
}