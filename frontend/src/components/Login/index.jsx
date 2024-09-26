import React from "react";
import styles from "./index.module.css";
import MyModal from "../MyModal";
import { useNavigate } from "react-router-dom";
import crossIcon from "../../assets/cross.jpg";
import CommonAuthForm from "../../utils/CommonAuthForm";
import RegisterContext from "../../context/RegisterContext";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { loginUser } from "../../apis/auth";
import { useOutletContext } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const getData = useOutletContext();
  const [loader, setLoader] = useState(false);
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
    setLoader(true);

    loginUser(formData).then((res) => {
      if (res.status == "200") {
        localStorage.setItem("token", res.headers["x-token"]);
        localStorage.setItem("username", formData.username);
        getData();
        navigate("/");
        setLoader(false);
        toast.success(res.data.msg);
      } else if (res.status == "400") {
        toast.error(res.data.msg);
        setLoader(false);
      } else {
        toast.error(res.data.msg);
        setLoader(false);
      }
    });
  };

  const onClose = () => {
    navigate("/");
  };
  return (
    <MyModal>
      <RegisterContext.Provider
        value={{ formData, handleInput, handleSubmit, errors, loader }}
      >
        <div className={styles.container}>
          <CommonAuthForm>
            <span>Login</span>
          </CommonAuthForm>
          <img src={crossIcon} alt="cross icon" onClick={onClose} />
        </div>
      </RegisterContext.Provider>
    </MyModal>
  );
}

export default Login;
