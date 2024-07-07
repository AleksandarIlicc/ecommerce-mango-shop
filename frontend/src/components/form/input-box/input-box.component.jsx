import "./input-box.style.scss";

const InputBox = ({ label, htmlFor, onChange, imgSrc, ...otherProps }) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>{label}</label>
      <div className="input-box-container">
        <input onChange={onChange} {...otherProps} />
        {imgSrc && <img src={imgSrc} alt="Radio option" />}
      </div>
    </div>
  );
};

export default InputBox;
