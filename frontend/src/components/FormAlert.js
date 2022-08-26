import React from "react";
import { useSelector } from "react-redux";

const FormAlert = () => {
  const alerts = useSelector((state) => state.formAlert);

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div
        key={alert.id}
        className={`password-alert password-alert--${alert.alertType}`}
      >
        {alert.message}
      </div>
    ))
  );
};

export default FormAlert;
