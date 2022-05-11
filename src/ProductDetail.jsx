import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams, Link, useNavigate } from "react-router-dom";
import { add } from './utilities/shoppingCartLogic';

export default function ProductDetail() {

  let s = useStates('main');

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
    add(s.cartContents, product);
    // Show the cart
    navigate('/shopping-cart');
  }

  return <Container className="productList">
    <Row><Col>
      <Link to={`/`}>
        <button type="button" className="my-4 btn btn-primary">Back to list</button>
        <hr />
      </Link>
    </Col></Row>
    <Row><Col><h1 className="mb-2">{name}</h1></Col></Row>
    <Row className="mb-3"><Col><h4>Category: {categoryName}</h4></Col></Row>
    <Row><Col><p>{description}</p></Col></Row>
    <Row><Col><p>Price: ${price}</p></Col></Row>
    <Row><Col>
      <Link to={`/product-edit/${id}`}>
        <button type="button" className="my-4 btn btn-primary float-end">Edit</button>
      </Link>
    </Col></Row>
    <Row><Col>
      <button type="button" onClick={buy} className="mt-2 btn btn-primary float-end">Buy</button>
    </Col></Row>
  </Container>
}