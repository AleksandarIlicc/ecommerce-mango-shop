import { useState } from "react";

import "./payment-gateaway.style.scss";

const PaymentGateaway = ({ order, payOrder }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    cardNumber1: "",
    cardNumber2: "",
    cardNumber3: "",
    cardNumber4: "",
    expirationDate: "",
    cvc: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isSubmitDisabled =
    order.isPaid ||
    !formValues.name ||
    !formValues.cardNumber1 ||
    !formValues.cardNumber2 ||
    !formValues.cardNumber3 ||
    !formValues.cardNumber4 ||
    !formValues.expirationDate ||
    !formValues.cvc;

  return (
    <div className="payment-box p-[2rem] rounded-[.5rem]">
      <h3 className="heading__tertiary heading__tertiary--white text-center">
        Payment Gateaway
      </h3>

      <form className="credit-card" onSubmit={payOrder}>
        <div className="flex flex-col gap-4 mb-6">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            required
          />
        </div>

        <fieldset className="flex flex-col gap-4 mb-6">
          <label for="cc-1">Card Number</label>
          <div
            data-connected-inputs
            className="cc-inputs flex justify-between gap-[1.3rem]"
          >
            <input
              type="tel"
              maxlength="4"
              aria-label="Credit Card First 4 Digits"
              id="cc-1"
              name="cardNumber1"
              onChange={handleInputChange}
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxlength="4"
              aria-label="Credit Card Second 4 Digits"
              id="cc-1"
              name="cardNumber2"
              onChange={handleInputChange}
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxlength="4"
              aria-label="Credit Card Third 4 Digits"
              id="cc-1"
              name="cardNumber3"
              onChange={handleInputChange}
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxlength="4"
              aria-label="Credit Card Last 4 Digits"
              id="cc-1"
              name="cardNumber4"
              onChange={handleInputChange}
              required
              pattern="[0-9]{4}"
            />
          </div>
        </fieldset>

        <div className="flex justify-between gap-4">
          <fieldset className="flex flex-col gap-4">
            <label for="expiration-month">Expiration</label>
            <div>
              <input
                type="date"
                id="date"
                name="expirationDate"
                onChange={handleInputChange}
                required
              />
            </div>
          </fieldset>

          <div className="flex flex-col gap-4">
            <label for="cvc">CVC</label>
            <input
              type="number"
              id="cvc"
              name="cvc"
              min="2020"
              max="2100"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="btn btn__pay mt-16"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentGateaway;
