import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductItem from './pages/ProductItem'
import CategoriesItems from './pages/CategoriesItems';
import Home from './pages/Home';
import ShopOnline from './pages/ShopOnline';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useDispatch } from 'react-redux';
import { getState, getInfo } from './pages/Auth/authSlice';
import axios from 'axios';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';


const config = {
  apiKey: process.env.REACT_APP_AUTH_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(getState({
          isSignedIn: !!user
        }))
        return
      }

        try {
          await axios.post('/api/users', {
            name: user.displayName,
            email: user.email,
            signInMethod: 'Sign in with Google'
          })
          dispatch(getState({
            isSignedIn: !!user
          }))
          dispatch(getInfo({
            name: user.displayName
          }))
        } catch (err) {
          console.log(err)
        }

    });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop-online' element={<ShopOnline />} />
        <Route path='/categories' element={<ShopOnline />} />
        <Route path='/products/:id' element={<ProductItem />} />
        <Route path='/categories/:categories' element={<CategoriesItems />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account' element={<Auth />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
