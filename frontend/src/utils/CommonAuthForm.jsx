import React from "react";
import styles from "./index.module.css";
import eyeIcon from "../assets/eye.png";

function CommonAuthForm({ children }) {
  return (
    <div className={styles.commonFormContainer}>
      <h3>{children}</h3>
      <form>
        <div>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input
            required
            type="text"
            name="username"
            placeholder="Enter password"
            id={styles.password}
          />
          <img src={eyeIcon} alt="eye icon" />
        </div>
        <button>{children}</button>
      </form>
    </div>
  );
}

export default CommonAuthForm;
