import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useStates } from './utilities/states';
import { factory } from './utilities/FetchHelper';
import './utilities/scrollBehavior.js';

import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';

const { Product, Categorie: Category } = factory;

export default function App() {

  let s = useStates('main', {
    products: [],
    categories: []
  });

  useEffect(() => {
    (async () => {
      // get the products from the db
      s.products = await Product.find();
      // get the categories from the db
      s.categories = await Category.find();
    })();
  }, []);

  return s.products.length ? <Router>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route path="/product-edit/:id" element={<ProductEdit />} />
    </Routes>
  </Router> : null;
}