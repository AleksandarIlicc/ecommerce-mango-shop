import SingleCartProduct from "../single-cart-product/single-cart-product.component";

const OrderItems = ({ items, productsPrice }) => (
  <div>
    <h3 className="heading__tertiary mb-medium">Order Items</h3>
    <div className="flex flex-col gap-[2rem]">
      {items && items.length > 0 ? (
        items.map((product) => (
          <SingleCartProduct
            key={product._id}
            product={product}
            productsPrice={productsPrice}
          />
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  </div>
);

export default OrderItems;
