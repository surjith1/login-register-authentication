import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./component/Signup/Signup";
import Main from "./Main/Main";
import Login from "./Login/Login";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import PasswordReset from "./PasswordReset/PasswordReset";
import EmailVerify from "./EmailVerify/EmailVerify";
const BASEURL = "https://booking-hall-api.herokuapp.com";

function App() {
  // {user && <Route path="/" exact element={<Main />} />}
  // <Route path="/login" exact element={<Login />} />
  //     <Route path="/" element={<Navigate replace to="/login" />} />
  const user = localStorage.getItem("token");
  return (
    <div>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup BASEURL={BASEURL} />} />
        <Route path="/login" exact element={<Login BASEURL={BASEURL} />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route
          path="/users/:id/verify/:token"
          element={<EmailVerify BASEURL={BASEURL} />}
        />
        <Route
          path="/forgot-password"
          exact
          element={<ForgotPassword BASEURL={BASEURL} />}
        />
        <Route
          path="/password-reset/:id/:token"
          exact
          element={<PasswordReset />}
        />
      </Routes>
    </div>
  );
}

export default App;
