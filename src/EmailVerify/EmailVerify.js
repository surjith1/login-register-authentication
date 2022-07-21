import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../images/success.png";
import styles from "./styles.module.css";
//import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = ({ BASEURL }) => {
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${BASEURL}/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      <div className={styles.container}>
        <img src={success} alt="success_img" className={styles.success_img} />
        <h1>Email verified successfully</h1>
        <Link to="/login">
          <button className={styles.green_btn}>Login</button>
        </Link>
      </div>
    </>
  );
};

export default EmailVerify;
