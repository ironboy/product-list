import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useStates } from './utilities/states';
import { init } from './utilities/shoppingCartLogic';
import './utilities/scrollBehavior';

/* NOTE: Check documentation on usage in FetchHelper! */
import {
  Product,
  Category
} from './utilities/FetchHelper';

import MainNav from './MainNav';
import StartPage from './StartPage';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';
import ShoppingCart from './ShoppingCart'

export default function App() {

  /* 
    NOTE:

    useStates is a custom hook that provides
    namespaced states that can be reached in all components

    it does the job of useState and useContext in one
    and then some more:
    it also makes binding data to forms real easy
     - see the ProductEdit component

    all the properties in the state will automatically
    trigger rerendering of components when you change them
    so no more need for useState and the setProperty
    function from useState

    here we create a named state with the name "main"
    it will be later be accessed in most of our components
  */

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
      console.log(s);
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