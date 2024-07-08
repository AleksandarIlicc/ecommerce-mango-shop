import { useDispatch, useSelector } from "react-redux";
import FormPage from "../form-page/form-page.component";
import { userLoginFail, userLoginSuccess } from "../../features/user/authSlice";
import { loadUser } from "../../utils/auth";
import { handleResponse } from "../../utils/helpers";
import { loginFields, initialLoginData } from "../../utils/formFields";
import useAuth from "../../customHooks/useAuth";
import AuthClient from "../../api/authApis";

import { toast } from "react-toastify";

const SigninPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const redirect = useAuth(userInfo, "/");
  const authClient = new AuthClient();

  const handleLoginSubmit = async (formData) => {
    const { email, password } = formData;
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ email, password });

    const response = await authClient.userLogin(body, config);
    const handledResponse = handleResponse(response);

    if (handledResponse.errorMessage) {
      const errors = response.response.data.errors;
      if (errors) {
        errors.forEach((error) => toast.error(error.msg));
      }
      dispatch(userLoginFail());
    } else {
      dispatch(userLoginSuccess(handledResponse));
      loadUser();
    }
  };

  const formConfig = {
    isLoginMode: true,
    redirectPage: "register",
    redirect,
    textLink: "Create your account",
    fields: loginFields,
    initialFormData: initialLoginData,
    showCheckoutSteps: true,
  };

  return (
    <FormPage formConfig={formConfig} onSubmitHandler={handleLoginSubmit} />
  );
};

export default SigninPage;
