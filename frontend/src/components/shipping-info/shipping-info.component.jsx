const ShippingInfo = ({
  fullName,
  address,
  city,
  postalCode,
  country,
  isDelivered,
  deliveredAt,
  className = "",
}) => (
  <div className={`order__box ${className}`}>
    <div>
      <p>
        <span>Name:</span> {fullName}
      </p>
      <p>
        <span>Address:</span> {address}, {postalCode} {city}, {country}
      </p>
    </div>
    {isDelivered !== undefined && (
      <p
        className={`alert ${isDelivered ? "alert--success" : "alert--danger"}`}
      >
        {isDelivered ? `Delivered at ${deliveredAt}` : "Not delivered"}
      </p>
    )}
  </div>
);

export default ShippingInfo;
