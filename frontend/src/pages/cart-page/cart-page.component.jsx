import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleCartProduct from "../../components/single-cart-product/single-cart-product.component";
import OrderSummary from "../../components/order-summary/order-summary.component";

const CartPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.user);
  const { userInfo } = userSignin;

  const handleCheckout = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/signin?redirect=/shipping");
    }
  };

  const toPrice = (num) => Number(num.toFixed(2));

  const numOfProducts = toPrice(
    cartItems.reduce((acc, product) => {
      return acc + +product.quantity;
    }, 0)
  );

  const productsPrice = toPrice(
    cartItems.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0)
  );

  const calcShippingPrice = () => {
    const upperLimitForShipping = 250;
    const shippingPercentage = 20;

    if (productsPrice < upperLimitForShipping) {
      return (shippingPercentage * productsPrice) / 100;
    } else {
      return 0;
    }
  };

  const shippingPrice = toPrice(calcShippingPrice());
  const totalPrice = toPrice(productsPrice + shippingPrice);

  return (
    <main>
      <section className="cart-section section">
        <div className="container">
          <h2 className="heading__secondary mb-medium">shopping cart</h2>
          <div className="cart__container">
            <div className="cart__list">
              {cartItems.length > 0 &&
                cartItems.map((product) => {
                  return <SingleCartProduct product={product} />;
                })}
              {!cartItems.length && <div>There are no items in your bag.</div>}
            </div>

            <OrderSummary
              numOfProducts={numOfProducts}
              shippingPrice={shippingPrice}
              productsPrice={productsPrice}
              totalPrice={totalPrice}
              cartItems={cartItems}
              onClick={handleCheckout}
              textBtn="Proceed to Checkout"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
