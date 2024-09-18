import React from "react";
import styles from "./index.module.css";
import crossIcon from "../../assets/cross.jpg";
import CommonAuthForm from "../../utils/CommonAuthForm";
import MyModal from "../MyModal";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/");
  };

  return (
    <MyModal>
      <div className={styles.container}>
        <CommonAuthForm>
          <span>Register</span>
        </CommonAuthForm>
        <img src={crossIcon} alt="cross icon" onClick={onClose} />
      </div>
    </MyModal>
  );
}

export default Register;
