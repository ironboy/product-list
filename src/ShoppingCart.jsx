import { useStates } from './utilities/states';

import { Container, Row, Col } from 'react-bootstrap';

export default function ShoppingCart() {

  let s = useStates('main');

  let totalSum = s.cartContents.reduce((acc, row) =>
    acc + row.quantity * row.product.price, 0);

  return <Container className="shoppingCart">
    <Row><Col>
      <h1>Shopping cart</h1>
    </Col></Row>
    {s.cartContents.map((row, i) => <Row key={i}>
      <Col>{row.product.name}</Col>
      <Col>{row.quantity}</Col>
      <Col>{row.quantity * row.product.price}</Col>
    </Row>)}
    <Row>
      <Col>Summa:</Col>
      <Col></Col>
      <Col>{totalSum}</Col>
    </Row>
  </Container>
}