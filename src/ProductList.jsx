import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import CategorySelect from './CategorySelect';


export default function ProductList() {

  scrollRestore();

  let s = useStates('main');
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  return <Container className="productList">
    <Row><Col><h1>Products</h1></Col></Row>
    <Row className="mb-3"><Col><CategorySelect /></Col></Row>
    {s.products.map(({ id, name, description, price }) =>
      <Row className="product" key={id} onClick={() => showDetail(id)}>
        <Card>
          <Col xxl="12">
            <h3>{name}</h3>
          </Col>
          <Col xxl="12">
            <p>{description}</p>
          </Col>
          <Col xxl="12">
            <p><b>Price:</b> ${price}</p>
          </Col>
        </Card>
      </Row>
    )}
  </Container>
}