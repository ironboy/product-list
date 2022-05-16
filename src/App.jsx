import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useStates } from './utilities/states';
import { factory } from './utilities/FetchHelper';
import { init } from './utilities/shoppingCartLogic';
import './utilities/scrollBehavior';

import MainNav from './MainNav';
import StartPage from './StartPage';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';
import ShoppingCart from './ShoppingCart'

// Create classes used for fetching from the REST-api
const { Product, Categorie: Category } = factory;

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
      // initilize the shopping cart
      // (this provides local storage of cartContents)
      init(s, 'cartContents');
    })();
  }, []);

  return s.products.length === 0 ? null :
    <Router>
      <MainNav />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/product-edit/:id" element={<ProductEdit />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
}