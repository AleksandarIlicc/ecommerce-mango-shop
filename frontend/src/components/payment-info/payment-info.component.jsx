const PaymentInfo = ({ paymentMethod }) => (
  <div className="order__box">
    <h3 className="heading__tertiary mb-medium">Payment</h3>
    <div>
      <p>
        <span>Method:</span> {paymentMethod}
      </p>
    </div>
  </div>
);

export default PaymentInfo;
