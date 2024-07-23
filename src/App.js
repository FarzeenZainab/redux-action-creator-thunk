import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  // sending an async request to firebase when the state of our cart changes
  // There is a problem with this approach. When the page loads for the first time
  // useEffect will send the request with empty body that will overwrite the existing
  // cart data in firebase
  useEffect(() => {
    const sendCartData = async () => {
      const response = await fetch(
        "https://redux-thunk-9110c-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      return await response.json();
    };

    sendCartData();
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
