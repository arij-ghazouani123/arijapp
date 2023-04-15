import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import axios from "axios";

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="mb-3 d-inline-block mx-2" style={{ width: "50px" }}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control form-control-sm"
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const VerificationCode = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeCode1 = (event) => {
    setCode1(event.target.value);
  };

  const handleChangeCode2 = (event) => {
    setCode2(event.target.value);
  };

  const handleChangeCode3 = (event) => {
    setCode3(event.target.value);
  };

  const handleChangeCode4 = (event) => {
    setCode4(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const verificationCode = `${code1}${code2}${code3}${code4}`;
    const email = localStorage.getItem("email"); // retrieve email from localStorage

    try {
      const response = await axios.post("/user/ResetPassword", {
        Email: email,
        OTP: verificationCode,
        Password: password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Password Reset</h1>
            <p className="lead text-center">Enter your verification code</p>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Verification Code</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.codeInputContainer}>
                <div className="d-flex justify-content-center">
                  <InputField
                   maxLength={1}
                    value={code1}
                    onChange={handleChangeCode1}
                  />
                  <InputField
                   maxLength={1}
                    value={code2}
                    onChange={handleChangeCode2}
                  />
                  <InputField
                  maxLength={1}
                    value={code3}
                    onChange={handleChangeCode3}
                  />
                  <InputField
                  maxLength={1}
                    value={code4}
                    onChange={handleChangeCode4}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword2" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    readOnly={false} // Remove readOnly attribute
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    readOnly={false} // Remove readOnly attribute
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-3" onClick={handleSubmit}>
                <Link to="/login" className={styles.link}>
                Reset
              </Link>
                </button>
              </div>
            </form>
            <p>
              Didn't receive a code?{" "}
                <Link to="/ForgotPassword">Resend Code</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerificationCode