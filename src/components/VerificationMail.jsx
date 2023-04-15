import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const VerificationMail = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // your existing logic for verification code goes here
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Verification Mail</h1>
            <p className="lead text-center">Enter your verification code</p>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Verification Code</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.codeInputContainer}>
                <div className="d-flex justify-content-center">
                  {/* your existing code inputs go here */}
                </div>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto mt-5">
                <button type="submit" className="btn btn-primary">
                  Verify
                </button>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto mt-5">
                <button type="button" className="btn btn-primary">
                  <Link to="/Login" className="text-white text-decoration-none">
                    Go to Login
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationMail;