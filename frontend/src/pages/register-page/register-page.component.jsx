import { useDispatch, useSelector } from "react-redux";
import FormPage from "../form-page/form-page.component";
import {
  userRegisterFail,
  userRegisterSuccess,
} from "../../features/user/authSlice";
import { loadUser } from "../../utils/auth";
import useAuth from "../../customHooks/useAuth";
import UserClient from "../../api/userApis";
import { registerFields, initialRegisterData } from "../../utils/formFields";
import { handleResponse } from "../../utils/helpers";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const redirect = useAuth(userInfo, "/");
  const userClient = new UserClient();

  const handleRegisterSubmit = async (formData) => {
    const { name, email, password, password2 } = formData;
    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ name, email, password });

    const response = await userClient.registerUser(body, config);
    const handledResponse = handleResponse(response);

    if (handledResponse?.errorMessage) {
      toast.error(handledResponse.errorMessage);
      dispatch(userRegisterFail());
    } else {
      dispatch(userRegisterSuccess(response));
      loadUser();
    }
  };

  const formConfig = {
    isLoginMode: false,
    redirectPage: "signin",
    redirect,
    textLink: "Already have an account?",
    fields: registerFields,
    initialFormData: initialRegisterData,
    showCheckoutSteps: false,
  };

  return (
    <FormPage formConfig={formConfig} onSubmitHandler={handleRegisterSubmit} />
  );
};

export default RegisterPage;
