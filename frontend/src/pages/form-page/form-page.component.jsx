import Form from "../../components/form/form.component";
import CheckoutSteps from "../../components/checkout-steps/checkout-steps.component";
import useFormData from "../../customHooks/useFormData";

const FormPage = ({ formConfig, onSubmitHandler }) => {
  const [formData, handleFormData] = useFormData(formConfig.initialFormData);

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitHandler(formData);
  };

  return (
    <main>
      <section className="form-section">
        {formConfig.showCheckoutSteps && <CheckoutSteps step1={true} />}

        <Form
          onSubmit={onSubmit}
          handleFormData={handleFormData}
          formData={formData}
          formConfig={formConfig}
        />
      </section>
    </main>
  );
};

export default FormPage;
