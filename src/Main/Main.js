import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.reload();
  // };
  let navigate = useNavigate();

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>fakebook</h1>
        <button
          className={styles.white_btn}
          onClick={() => {
            navigate("/login");
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;
