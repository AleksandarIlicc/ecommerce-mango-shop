import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuth = (user, defaultRedirectPath) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : defaultRedirectPath;

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  return redirect;
};

export default useAuth;
