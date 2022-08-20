import { Routes, Route } from "react-router-dom";
import "./App.css"
import Navbar from "./component/layout/Navbar/Navbar";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Search from "./pages/Search/Search";
import LoginSingnUp from "./pages/User/LoginSingnUp/LoginSingnUp";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { loadUser } from "./redux/actions/userAction";
import UserOptions from "./pages/User/UserOptions/UserOptions";
import { useSelector } from "react-redux";
import UserProfile from "./pages/User/UserProfile/UserProfile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./pages/User/UpdateProfile/UpdateProfile";
import UpdatePassword from "./pages/User/UpdatePassword/UpdatePassword";
import ForgotPassword from "./pages/User/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword/ResetPassword";
import Cart from "./pages/Cart/Cart/Cart";
import Shipping from "./pages/Cart/Shipping/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder/ConfirmOrder";
import axios from "axios";
import Payment from "./pages/Cart/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./pages/Cart/OrderSuccess/OrderSuccess";
import MyOrders from "./pages/Order/MyOrders/MyOrders";
import OrderDetails from "./pages/Order/OrderDetails/OrderDetails";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ProductList from "./pages/Admin/ProductList/ProductList";
import NewProduct from "./pages/Admin/NewProduct/NewProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct/UpdateProduct";
import OrderList from "./pages/Admin/OrderList/OrderList";
import ProcessOrder from "./pages/Admin/ProcessOrder/ProcessOrder";
import UsersList from "./pages/Admin/UsersList/UsersList";
import UpdateUser from "./pages/Admin/UpdateUser/UpdateUser";

const App = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    console.log(stripeApiKey)
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {

    store.dispatch(loadUser());

    getStripeApiKey();

  }, []);


  return (
    <>
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSingnUp />} />

        <Route path='/account' element={<ProtectedRoute />}>
          <Route path='/account' element={<UserProfile />} />
        </Route>

        <Route path='/me/update' element={<ProtectedRoute />}>
          <Route path='/me/update' element={<UpdateProfile />} />
        </Route>

        <Route path='/password/update' element={<ProtectedRoute />}>
          <Route path='/password/update' element={<UpdatePassword />} />
        </Route>

        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />

        <Route path='/cart' element={<Cart />} />

        <Route path='/shipping' element={<ProtectedRoute />}>
          <Route path='/shipping' element={<Shipping />} />
        </Route>

        <Route path='/order/confirm' element={<ProtectedRoute />}>
          <Route path='/order/confirm' element={<ConfirmOrder />} />
        </Route>

        {stripeApiKey && (
          <Route path='/process/payment' element={<ProtectedRoute />}>
            <Route path='/process/payment' element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            } />
          </Route>
        )}

        <Route path='/success' element={<ProtectedRoute />}>
          <Route path='/success' element={<OrderSuccess />} />
        </Route>

        <Route path='/orders' element={<ProtectedRoute />}>
          <Route path='/orders' element={<MyOrders />} />
        </Route>

        <Route path='/order/:id' element={<ProtectedRoute />}>
          <Route path='/order/:id' element={<OrderDetails />} />
        </Route>

        <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}/>}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
        </Route>

        <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}/>}>
          <Route path='/admin/products' element={<ProductList />} />
        </Route>

        <Route path='/admin/product' element={<ProtectedRoute isAdmin={true}/>}>
          <Route path='/admin/product' element={<NewProduct />} />
        </Route>

        <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}/>}>
          <Route path='/admin/product/:id' element={<UpdateProduct />} />
        </Route>

        <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}/>}>
          <Route path='/admin/orders' element={<OrderList />} />
        </Route>

        <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}/>}>
          <Route path='/admin/order/:id' element={<ProcessOrder />} />
        </Route>

        <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}/>}>
          <Route path='/admin/users' element={<UsersList />} />
        </Route>

        <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}/>}>
          <Route path='/admin/user/:id' element={<UpdateUser />} />
        </Route>

      </Routes>

      <Footer />
    </>

  );
}

export default App;
