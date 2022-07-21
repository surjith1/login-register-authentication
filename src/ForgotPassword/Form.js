import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const baseUrl = "http://localhost:4200";
function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const [invalidUser, setInvalidUser] = useState("");
  //const [busy, setBusy] = useState(true);
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  //console.log(search)
  const { token, userId } = queryString.parse(location.search);
  const verifyToken = async () => {
    try {
      const { data } = await axios(
        `${baseUrl}/forgotpassword?token=${token}&id=${userId}`
      );

      //setBusy(false);
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.success) return setInvalidUser(data.error);
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  const handleOnChage = ({ target }) => {
    const { name, value } = target;
    setNewPassword({ ...newPassword, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = newPassword;
    if (password.trim().length < 8 || password.trim().length > 20) {
      return setError("Password should be  8 to 20 character Long !");
    }

    if (password !== confirmPassword) {
      return setError("Password does not match !");
    }
    try {
      //setBusy(true);
      const { data } = await axios.post(
        `${baseUrl}/resetpassword?token=${token}&id=${userId}`,
        { password }
      );

      //setBusy(false);
      if (data.success) {
        navigate("/resetpassword");
        setSuccess(true);
      }
    } catch (error) {
      //setBusy(false);
      //const {data1} = error.response;
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.success) return setError(data.error);
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };
  if (invalidUser)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {invalidUser}
      </Alert>
    );

  if (success)
    return (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Password reset Successfull...
      </Alert>
    );

  // if (busy)
  //   return (
  //     <div className="invalid-user">
  //       <h1>Wait for a moment Reset Token is Verifying... </h1>
  //     </div>
  //   );

  return (
    <div className="reset-psw-sec max-w-screen m-auto pt-40">
      <h1 className="text-center text-3xl text-gray-500 mb-3">
        Reset Password
      </h1>

      <form className="form-wrap" onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div className="form-group">
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            onChange={handleOnChage}
          />
        </div>

        <div className="form-group">
          <TextField
            id="password"
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            onChange={handleOnChage}
          />
        </div>

        <div className="btn">
          <Button variant="contained" type="submit">
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
