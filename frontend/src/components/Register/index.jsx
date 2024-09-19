import React from "react";
import styles from "./index.module.css";
import crossIcon from "../../assets/cross.jpg";
import CommonAuthForm from "../../utils/CommonAuthForm";
import MyModal from "../MyModal";
import { useNavigate } from "react-router-dom";
import RegisterContext from "../../context/RegisterContext";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const onClose = () => {
    navigate("/");
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setErrors({ username: "", password: "" });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = 0;
    const { username, password } = formData;

    if (!username.match(/^[A-Za-z][A-Za-z0-9_]{5,29}$/)) {
      err++;
      setErrors((prev) => ({ ...prev, username: "Invalid username!" }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      err++;
      setErrors((prev) => ({ ...prev, password: "Invalid password!" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (err == 0) {
      toast.success("User registered successfully!");
    }
  };

  return (
    <MyModal>
      <RegisterContext.Provider
        value={{ formData, handleInput, handleSubmit, errors }}
      >
        <div className={styles.container}>
          <CommonAuthForm>
            <span>Register</span>
          </CommonAuthForm>
          <img src={crossIcon} alt="cross icon" onClick={onClose} />
        </div>
      </RegisterContext.Provider>
      <Toaster
        toastOptions={{
          style: {
            width: "225px",
            height: "50px !important",
            fontSize: "13px",
            padding: "5px 5px",
          },
        }}
      />
    </MyModal>
  );
}

export default Register;
