import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const PasswordReset = ({ BASEURL }) => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `${BASEURL}/api/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
      } catch (error) {}
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      window.location = "/login";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>Add New Password</h1>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          className={styles.input}
        />
        {error && <div className={styles.error_msg}>{error}</div>}
        {msg && <div className={styles.success_msg}>{msg}</div>}
        <button type="submit" className={styles.green_btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
