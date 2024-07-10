const PaymentInfo = ({ paymentMethod, isPaid, paidAt }) => (
  <div className="order__box">
    <h3 className="heading__tertiary mb-medium">Payment</h3>
    <div>
      <p>
        <span>Method:</span> {paymentMethod}
      </p>
    </div>
    {isPaid !== undefined &&
      (isPaid ? (
        <p className="alert alert--success">Paid at {paidAt}</p>
      ) : (
        <p className="alert alert--danger">Not paid</p>
      ))}
  </div>
);

export default PaymentInfo;
