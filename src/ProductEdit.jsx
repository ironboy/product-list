import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import CategorySelect from './CategorySelect';
import { initializeMedia, captureImage, uploadImage } from './utilities/imageCapture';
import { missingImage } from './utilities/handleMissingImage';
import { useState } from 'react';

export default function ProductDetail() {

  let s = useStates('main');
  let { id } = useParams();
  let navigate = useNavigate();

  // a local state only for this component
  let l = useStates({
    captureMode: true,
    replaceImage: false
  });

  // initialize media (start talking to camera)
  // when the component loads
  useState(() => {
    initializeMedia();
  }, []);


  // find the correct product based on id
  let product = s.products.find(x => x.id === +id);
  if (!product) { return null; }
  let { name, description, price } = product;

  async function save() {
    // Save to db
    await product.save();
    // Upload image if the image should be replaced
    l.replaceImage && await uploadImage(id);
    // Navigate to detail page
    navigate(`/product-detail/${id}`);
  }

  function takeImage() {
    captureImage();
    l.captureMode = false;
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

    <Container className="product-edit">
      {/* Online */}
      {l.replaceImage ?
        <Row><Col>
          <video style={{ display: l.captureMode ? 'block' : 'none' }} autoPlay></video>
          <canvas width="320" height="240" style={{ display: !l.captureMode ? 'block' : 'none' }}></canvas>
          <button className="btn btn-primary mt-3 mb-5" onClick={takeImage}>Capture</button>
        </Col></Row> : <Row><Col>
          <img onError={event => missingImage(event, name)} src={`/images/products/${id}.jpg`} />
          <button className="btn btn-primary mt-3 mb-5" onClick={() => l.replaceImage = true}>Replace image</button>
        </Col></Row>}
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