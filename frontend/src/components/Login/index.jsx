import React from "react";
import styles from "./index.module.css";
import MyModal from "../MyModal";
import { useNavigate } from "react-router-dom";
import crossIcon from "../../assets/cross.jpg";
import CommonAuthForm from "../../utils/CommonAuthForm";

function Login() {
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/");
  };
  return (
    <MyModal>
      <div className={styles.container}>
        <CommonAuthForm>
          <span>Login</span>
        </CommonAuthForm>
        <img src={crossIcon} alt="cross icon" onClick={onClose} />
      </div>
    </MyModal>
  );
}

export default Login;
