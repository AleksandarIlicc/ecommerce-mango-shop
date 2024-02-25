import "./order-summary.style.scss";

const OrderSummary = ({
  numOfProducts,
  shippingPrice,
  productsPrice,
  totalPrice,
  cartItems,
  onClick,
  textBtn,
}) => {
  return (
    <div className="order-summary mb-auto">
      <div>
        <p>Number of products:</p>
        <span>{numOfProducts}</span>
      </div>
      <div>
        <p>Shipping:</p>
        <span className="shipping">${shippingPrice}</span>
      </div>
      <div>
        <p>Products price:</p>
        <span>${productsPrice}</span>
      </div>
      <div>
        <p className="total-price">Total Price:</p>
        <span>${totalPrice}</span>
      </div>

      {textBtn && (
        <button
          type="button"
          className="btn btn__proceed mt-large"
          onClick={onClick}
          disabled={cartItems.length === 0}
        >
          {textBtn}
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
