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
import ShoppingCart from './ShoppingCart'

const { Product, Categorie: Category } = factory;

window.Product = Product

export default function App() {

  let s = useStates('main', {
    products: [],
    categories: [],
    chosenCategoryId: 0,
    cartContents: []
  });

  useEffect(() => {
    (async () => {
      // get the categories from the db
      s.categories = await Category.find();
      // get the products from the db
      s.products = await Product.find();
    })();

    // All objects created by a certain class
    // share a common template object called prototype

    // Object.defineProperties can add properties to an object
    // if you use it on a prototype you will add a property
    // to all objects sharing that prototype
    Object.defineProperties(Product.prototype, {
      category: {
        configurable: true,
        get() {
          // this = the product we are 
          // asking for the category property
          return s.categories.find(category =>
            category.id === this.categoryId);
        }
      }
    });

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