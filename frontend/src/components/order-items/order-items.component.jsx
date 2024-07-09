import SingleCartProduct from "../single-cart-product/single-cart-product.component";

const OrderItems = ({ cartItems }) => (
  <div>
    <h3 className="heading__tertiary mb-medium">Order Items</h3>
    <div className="flex flex-col gap-[2rem]">
      {cartItems.length > 0 &&
        cartItems.map((product) => (
          <SingleCartProduct key={product._id} product={product} />
        ))}
    </div>
  </div>
);

export default OrderItems;
