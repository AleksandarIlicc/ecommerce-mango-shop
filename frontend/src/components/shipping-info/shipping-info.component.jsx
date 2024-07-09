const ShippingInfo = ({ fullName, address, city, postalCode, country }) => (
  <div className="order__box">
    <div>
      <p>
        <span>Name:</span> {fullName}
      </p>
      <p>
        <span>Address:</span> {address}, {postalCode} {city}, {country}
      </p>
    </div>
  </div>
);

export default ShippingInfo;
