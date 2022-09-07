import { Fragment, useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from './store/ui-slice';
import Notification from "./components/UI/Notification";

// to prevent loading cart and overwritting existing data
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCard = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending',
        message: 'Sending cart data!'
      }));
      const response = await fetch(
        "https://udemy-react-21466-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Send cart data failed.')
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }));
    };

    // not to show succes notification at the start
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error =>{
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
      }));
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
          />
      )}
      <Layout>
        {showCard && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
