import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";

const ResetPassword = () => {




  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`user/ResetPassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirmPassword,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        window.alert(data.message);
      } else {
        window.alert("Passwords do not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Reset Password</h1>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">RESET PASSWORD</h1>
            <form >
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  value={password}

                 
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                 Reset
              </button>
            </form>
            <div className="d-flex justify-content-center mt-4">
              <Link to="/login" className={styles.link}>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;