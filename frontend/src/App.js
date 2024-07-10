import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";

import { setAuthToken } from "./utils/auth";
import { loadUser } from "./utils/auth";
import MainContent from "./mainContent";

import "./sass/main.css";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const isAdmin = userInfo && userInfo.role === "admin";

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <MainContent isAdmin={isAdmin} />
      </Router>
    </div>
  );
}

export default App;
