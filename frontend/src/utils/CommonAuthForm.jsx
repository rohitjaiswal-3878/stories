import React, { useState } from "react";
import styles from "./index.module.css";
import eyeIcon from "../assets/eye.png";
import { useContext } from "react";
import RegisterContext from "../context/RegisterContext";
import toolTip from "../assets/tool-tip.png";

function CommonAuthForm({ children }) {
  const [togglePassword, setTogglePassword] = useState(true);

  const { formData, handleInput, handleSubmit, errors } =
    useContext(RegisterContext);

  return (
    <div className={styles.commonFormContainer}>
      <h3>{children}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>

          <div className={styles.inputTool}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInput}
              placeholder="Enter username"
              required
            />
            {children.props.children == "Register" && (
              <div className="tooltip" id="signup-tool-tip">
                <img src={toolTip} alt="tooltip" />
                <span className="tooltiptext">
                  Username should start with alphabet and can only contain
                  alphabets, numbers and underscore. Minimum length should be 6
                  characters.
                </span>
              </div>
            )}
          </div>
        </div>
        {errors.username && children.props.children == "Register" && (
          <span
            style={{
              color: "red",
              width: "80%",
              textAlign: "right",
              fontSize: "0.8rem",
              marginRight: "50px",
            }}
          >
            {errors.username}
          </span>
        )}

        <div style={{ marginTop: "25px" }}>
          <label htmlFor="">Password</label>
          <div className={styles.inputTool}>
            <input
              required
              type={togglePassword ? "password" : "text"}
              value={formData.password}
              onChange={handleInput}
              name="password"
              placeholder="Enter password"
              id={styles.password}
            />
            <img
              src={eyeIcon}
              id={styles.eyeIcon}
              alt="eye icon"
              onClick={() => setTogglePassword(!togglePassword)}
              style={{
                right: children.props.children == "Login" ? "7px" : "",
              }}
            />

            {children.props.children == "Register" && (
              <div className="tooltip" id="signup-tool-tip">
                <img src={toolTip} alt="tooltip" />
                <span className="tooltiptext">
                  Password length should be atleast 8 characters and must
                  contain atleast one uppercase letter,one lowercase letter,one
                  number, and one special character.
                </span>
              </div>
            )}
          </div>
        </div>
        {errors.password && children.props.children == "Register" && (
          <span
            style={{
              color: "red",
              width: "80%",
              textAlign: "right",
              fontSize: "0.8rem",
              marginRight: "50px",
            }}
          >
            {errors.password}
          </span>
        )}
        <button type="submit">{children}</button>
      </form>
    </div>
  );
}

export default CommonAuthForm;
