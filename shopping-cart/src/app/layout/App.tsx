import { Container, CssBaseline, LinearProgress } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import CartPage from "../../features/cart/CartPage";
import { fetchCartAsync } from "../../features/cart/cartSlice";
import Checkout from "../../features/checkout/Checkout";
import Home from "../../features/home/Home";
import ProductDetails from "../../features/home/ProductDetails";
import NotFound from "../errors/NotFound";
import { useAppDispatch } from "../store/ConfigureStore";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  if (loading) return <LinearProgress color="secondary" />

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products/:productid" component={ProductDetails} />
          <Route path="/cart" component={CartPage} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <PrivateRoute path="/orders" component={Orders} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
