import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { empty, save } from './utilities/shoppingCartLogic';
import { useEffect } from 'react';

export default function ShoppingCart() {

  let s = useStates('main');

  let totalSum = s.cartContents.reduce((acc, row) =>
    acc + row.quantity * row.product.price, 0);

  useEffect(() => {
    // Save the cart contents (on quantity changes)
    save();
  });

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
              <td className="text-end">
                <input className="text-end" style={{ width: 50 }} type="number" min={1} max={100} {...row.bind('quantity')} />
              </td>
              <td className="text-end" style={{ width: 100 }}>{(row.product.price).toFixed(2)}</td>
              <td className="text-end" style={{ width: 100 }}>{(row.quantity * row.product.price).toFixed(2)}</td>
            </tr>)}
            <tr className="fw-bold">
              <td>Sum</td>
              <td colSpan={3} className="text-end">
                {totalSum.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table> : <p>The cart is empty...</p>}
      </Col>
    </Row>
    <Row>
      <Col>
        <Link className="float-end text-decoration-none" to={`/product-list`}>
          <button type="button" className="btn btn-primary">Back to list</button>
        </Link>
        {s.cartContents.length ? <button onClick={empty} type="button" className="btn btn-primary float-end me-3">Empty cart</button> : <></>}
      </Col>
    </Row>
  </Container>
}