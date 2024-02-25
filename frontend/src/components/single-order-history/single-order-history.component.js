const SingleOrderHistory = ({ order, product }) => {
  return (
    <div className="history-order my-6">
      <figure>
        <img src={product.image} alt={product.name} />
      </figure>

      <div className="text-[1.2rem]">
        <p className="text-[2rem] font-semibold">{product.name}</p>
        <p>
          <span className="mr-[1rem]">Color:</span>
          {product.color}
        </p>
        <p>
          <span className="mr-[1rem]">Size:</span>
          {product.size}
        </p>
        <p>
          <span className="mr-[1rem]">Price:</span>${product.price}
        </p>
      </div>
    </div>
  );
};

export default SingleOrderHistory;
