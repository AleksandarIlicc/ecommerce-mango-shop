import InputBox from "../input-box/input-box.component";

const InputBoxList = ({ fields, formData, handleFormData }) => {
  return fields.map((field) => (
    <InputBox
      key={field.id}
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
  ));
};

export default InputBoxList;
