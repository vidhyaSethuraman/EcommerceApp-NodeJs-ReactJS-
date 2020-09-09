import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/main';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,Route} from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
import AddressForm from './components/AddressForm';
import Address from './components/Address';
import Payment from './components/payment';
import OrderPlaced from './components/orderplaced';
import Orders from './components/Orders';
import Wishlist from './components/Wishlist';


class AppRoutes extends React.Component
{
  render()
  {
    return(
      <BrowserRouter >


        <Route path='/' exact component={Main}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/cart' component={Cart}></Route>
        <Route path='/checkout/address/form' component={AddressForm}></Route>
        <Route path='/checkout/address/conformation' component={Address}></Route>
        <Route path='/checkout/payment' component={Payment}></Route>
        <Route path='/order/placed' component={OrderPlaced}></Route>
        <Route path='/order/tracking' component={Orders}></Route>
        <Route path='/wishlist' component={Wishlist}></Route>

      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <AppRoutes/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
