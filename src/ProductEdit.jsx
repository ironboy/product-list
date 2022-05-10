import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import CategorySelect from './CategorySelect';
import { useEffect } from 'react';

// TO-DO BUG: Does not show the correct category
// on hard reload

export default function ProductDetail() {

  let s = useStates('main');
  let { id } = useParams();
  let navigate = useNavigate();

  let product = s.products.find(x => x.id === +id);
  if (!product) { return null; }
  let { name, description, price, category } = product;

  async function save() {
    // Set the correct product category id 
    // based on the selected categoryName
    product.categoryId = (s.categories.find(category => category.name === s.editCategoryName)).id;
    // Save to db
    await product.save();
    // Navigate to detail page
    navigate(`/product-detail/${id}`);
  }

  // set the editCatogoryName state variable
  // to the category of this product
  useEffect(() => {
    s.editCategoryName = category.name;
  }, []);

  return <Container className="productList">
    <Row><Col><h1>{name}</h1></Col></Row>
    <Row><Col><p>{description}</p></Col></Row>
    <Row><Col><p>Price: ${price}</p></Col></Row>
    <Row><Col>
      <label className="mt-3">Name:
        <input className="form-control" {...product.bind('name')} />
      </label>
    </Col></Row>
    <Row><Col>
      <label className="mt-3">Description:
        <textarea className="form-control" {...product.bind('description')} />
      </label>
    </Col></Row>
    <Row><Col>
      <label className="mt-3">Price:
        <input type="number" className="form-control" {...product.bind('price')} />
      </label>
    </Col></Row>
    <Row className="mt-4"><Col>
      <label>
        Category:&nbsp;
        <CategorySelect bindTo='editCategoryName' />
      </label>
    </Col></Row>
    <button type="button" onClick={save} className="my-4 btn btn-primary float-end">Save</button>
  </Container>
}