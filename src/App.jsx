import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useStates } from './utilities/states';
import { factory } from './utilities/FetchHelper';
import './utilities/scrollBehavior';

import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';
import ShoppingCart from './ShoppingCart'


const { Product, Categorie: Category } = factory;

window.Product = Product

export default function App() {

  let s = useStates('main', {
    products: [],
    categories: [],
    chosenCategoryId: 0
  });

  useEffect(() => {
    (async () => {
      // get the categories from the db
      s.categories = await Category.find();
      // get the products from the db
      s.products = await Product.find();
    })();
  }, []);

  return s.products.length ? <Router>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route path="/product-edit/:id" element={<ProductEdit />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
    </Routes>
  </Router> : null;
}