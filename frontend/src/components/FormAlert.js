import React from "react";
import { useSelector } from "react-redux";

const FormAlert = () => {
  const alerts = useSelector((state) => state.formAlert);

  return (
    alerts !== null &&
    alerts.length > 0 && (
      <div className="from-alert-container">
        {alerts.map((alert) => {
          return (
            <div
              key={alert.id}
              className={`form-alert form-alert--${alert.alertType}`}
            >
              {alert.message}
            </div>
          );
        })}
      </div>
    )
  );
};

export default FormAlert;
