import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import CategorySelect from './CategorySelect';

export default function ProductDetail() {

  let s = useStates('main');
  let { id } = useParams();
  let navigate = useNavigate();

  let product = s.products.find(x => x.id === +id);
  if (!product) { return null; }
  let { name, description, price } = product;

  async function save() {
    // Save to db
    await product.save();
    // Navigate to detail page
    navigate(`/product-detail/${id}`);
  }

  // Check if we are offline (in that case no editing available)
  // console.log("navigator.onLine", navigator.onLine);

  return !navigator.onLine ?

    <Container>
      {/* Offline */}
      <Row><Col>
        <h4>Sorry no product editing while offline!</h4>
      </Col></Row>
    </Container > :

    <Container>
      {/* Online */}
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
          <CategorySelect bindTo={[product, 'categoryId']} />
        </label>
      </Col></Row>
      <button type="button" onClick={save} className="my-4 btn btn-primary float-end">Save</button>
    </Container>
}