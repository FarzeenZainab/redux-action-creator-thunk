import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { sendCartData } from "./store/cart-slice";
import Notification from "./components/UI/Notificiation";
import { uiActions } from "./store/ui-slice";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  // sending an async request to firebase when the state of our cart changes
  // There is a problem with this approach. When the page loads for the first time
  // useEffect will send the request with empty body that will overwrite the existing
  // cart data in firebase
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     const response = await fetch(
  //       "https://redux-thunk-9110c-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Sending cart data failed");
  //     }

  //     return await response.json();
  //   };

  //   sendCartData();
  // }, [cart]);

  // sending request and performing async task using redux thunk
  useEffect(() => {
    // disptach not only takes action types and payload as argurments but
    // it also take custom action creators thunks that takes functions
    // it disptach sees that an action creator that returns a function is
    // passed instead of an action type object, it will automatically execute
    // that function
    // Because it is a complex senerior, disptach is again provided in the parameter
    // of the redux thunk, so we can disptach again from inside the thunk
    dispatch(sendCartData(cart));

    const timeout = setTimeout(() => {
      dispatch(
        uiActions.showNotification({
          title: "",
          message: "",
          status: "",
        })
      );
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [cart, dispatch]);

  return (
    <Layout>
      {notification && (
        <Notification
          status={notification?.status}
          title={notification?.title}
          message={notification?.message}
        />
      )}

      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
