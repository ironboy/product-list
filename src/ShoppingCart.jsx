import { useStates } from './utilities/states';

import { Container, Row, Col } from 'react-bootstrap';

export default function ShoppingCart() {

  let s = useStates('main');

  let totalSum = s.cartContents.reduce((acc, row) =>
    acc + row.quantity * row.product.price, 0);

  if (!s.cartContents.length) {
    return <Container className="shoppingCart">
      <Row><Col>
        <h1>Shopping cart</h1>
      </Col></Row>
      <Row><Col>The cart is empty...</Col></Row>
    </Container>
  }

  return <Container className="shoppingCart">
    <Row><Col>
      <h1>Shopping cart</h1>
    </Col></Row>
    <Row>
      <Col>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-end">Quantity</th>
              <th className="text-end">Sum</th>
            </tr>
          </thead>
          <tbody>
            {s.cartContents.map((row, i) => <tr key={i}>
              <td>{row.product.name}</td>
              <td className="text-end">{row.quantity}</td>
              <td className="text-end">{row.quantity * row.product.price}</td>
            </tr>)}
            <tr className="fw-bold">
              <td>Sum</td>
              <td colspan={2} className="text-end">
                {totalSum}
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </Container>
}