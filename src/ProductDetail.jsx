import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {

  let s = useStates('main');
  let { id } = useParams();

  let product = s.products.find(x => x.id === +id);
  if (!product) { return null; }
  let { name, description, price } = product;

  return <Container className="productList">
    <Row><Col>
      <Link to={`/`}>
        <button type="button" className="my-4 btn btn-primary">Back to list</button>
        <hr />
      </Link>
    </Col></Row>
    <Row><Col><h1>{name}</h1></Col></Row>
    <Row><Col><p>{description}</p></Col></Row>
    <Row><Col><p>Price: ${price}</p></Col></Row>
    <Row><Col>
      <Link to={`/product-edit/${id}`}>
        <button type="button" className="my-4 btn btn-primary float-end">Edit</button>
      </Link>
    </Col></Row>
  </Container>
}