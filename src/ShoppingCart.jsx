import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { empty } from './utilities/shoppingCartLogic';

export default function ShoppingCart() {

  let s = useStates('main');

  let totalSum = s.cartContents.reduce((acc, row) =>
    acc + row.quantity * row.product.price, 0);

  return <Container className="shoppingCart">
    <Row><Col>
      <h1>Shopping cart</h1>
    </Col></Row>
    <Row>
      <Col>
        {s.cartContents.length ? <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-end">Quantity</th>
              <th className="text-end">à</th>
              <th className="text-end">Sum</th>
            </tr>
          </thead>
          <tbody>
            {s.cartContents.map((row, i) => <tr key={i}>
              <td>{row.product.name}</td>
              <td className="text-end">{row.quantity}</td>
              <td className="text-end">{row.product.price}</td>
              <td className="text-end">{row.quantity * row.product.price}</td>
            </tr>)}
            <tr className="fw-bold">
              <td>Sum</td>
              <td colSpan={3} className="text-end">
                {totalSum}
              </td>
            </tr>
          </tbody>
        </table> : <p>The cart is empty...</p>}
      </Col>
    </Row>
    <Row>
      <Col>
        <Link className="float-end text-decoration-none" to={`/`}>
          <button type="button" className="btn btn-primary">Back to list</button>
        </Link>
        {s.cartContents.length ? <button onClick={empty} type="button" className="btn btn-primary float-end me-3">Empty cart</button> : <></>}
      </Col>
    </Row>
  </Container>
}