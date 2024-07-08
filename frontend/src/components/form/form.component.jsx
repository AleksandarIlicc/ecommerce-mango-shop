import { Link } from "react-router-dom";
import InputBoxList from "./input-box-list/input-box-list.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({
  onSubmit,
  handleFormData,
  formData,
  formConfig: { isLoginMode, redirectPage, redirect, textLink, fields },
}) => {
  const pageTitle = isLoginMode ? "Sign In" : "Sign Up";
  const welcomeMessage = isLoginMode
    ? "Welcome back, you've been missed!"
    : null;
  const isNewCustomerLink = (
    <p className="paragraph">
      {redirectPage === "register" && "New customer?"}{" "}
      <Link to={`/${redirectPage}?redirect=${redirect}`}>{textLink}</Link>
    </p>
  );

  return (
    <div className="form-container">
      <ToastContainer />

      <div className="form-container__left">
        <div className="form-logo">
          <span>Mango</span>Shop
        </div>
      </div>

      <div className="form-container__right">
        <form className="form" onSubmit={onSubmit}>
          <div>
            <h1 className="heading__primary heading__primary--black mt-[2rem] mb-[2rem]">
              {pageTitle}
            </h1>
            <p>{isLoginMode && welcomeMessage}</p>
          </div>

          <InputBoxList
            fields={fields}
            formData={formData}
            handleFormData={handleFormData}
          />

          <div>
            <button className="btn btn__form mb-small" type="submit">
              Sign In
            </button>
          </div>

          {isNewCustomerLink}
        </form>
      </div>
    </div>
  );
};

export default Form;
