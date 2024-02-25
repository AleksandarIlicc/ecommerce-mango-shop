import { Link } from "react-router-dom";

import InputBox from "../input-box/input-box.component";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./form.style.scss";

const Form = ({
  onSubmit,
  handleFormData,
  formData,
  formTitle,
  formSubtitle,
  redirectPage,
  redirect,
  textLink,
  fields,
}) => {
  return (
    <div className="form-container">
      <div className="form-container__left">
        <div className="form-logo">
          <span>Mango</span>Shop
        </div>
      </div>

      <div className="form-container__right">
        <form className="form" onSubmit={onSubmit}>
          <div>
            <h1 className="heading__primary heading__primary--black mt-[2rem] mb-[2rem]">
              {formTitle}
            </h1>
            <p>{formSubtitle}</p>
          </div>

          <ToastContainer />

          {fields.map((field, index) => (
            <InputBox
              key={index}
              label={field.label}
              htmlFor={field.id}
              type={field.type}
              id={field.id}
              name={field.name}
              imgSrc={field.imgSrc}
              value={formData[field.name]}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleFormData}
            />
          ))}

          <div>
            <button className="btn btn__form mb-small" type="submit">
              Sign In
            </button>
          </div>

          {(redirectPage || redirect || textLink) && (
            <div>
              <p className="paragraph">
                {redirectPage === "register" && "New customer?"}{" "}
                <Link to={`/${redirectPage}?redirect=${redirect}`}>
                  {textLink}
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
