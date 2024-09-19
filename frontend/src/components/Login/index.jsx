import React from "react";
import styles from "./index.module.css";
import MyModal from "../MyModal";
import { useNavigate } from "react-router-dom";
import crossIcon from "../../assets/cross.jpg";
import CommonAuthForm from "../../utils/CommonAuthForm";
import RegisterContext from "../../context/RegisterContext";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setErrors({ username: "", password: "" });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = 0;

    toast.success("Successfully logged in!");
  };

  const onClose = () => {
    navigate("/");
  };
  return (
    <MyModal>
      <RegisterContext.Provider
        value={{ formData, handleInput, handleSubmit, errors }}
      >
        <div className={styles.container}>
          <CommonAuthForm>
            <span>Login</span>
          </CommonAuthForm>
          <img src={crossIcon} alt="cross icon" onClick={onClose} />
        </div>
      </RegisterContext.Provider>
      <Toaster
        toastOptions={{
          style: {
            width: "200px",
            height: "50px !important",
            fontSize: "13px",
            padding: "5px 5px",
          },
        }}
      />
    </MyModal>
  );
}

export default Login;
