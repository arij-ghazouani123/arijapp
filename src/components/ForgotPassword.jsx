import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";


function EmailForm() {
  const [Email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // send email and navigate to OTP page
      const response = await axios.post("/OTPReset", { Email });
      localStorage.setItem("email", Email); // store email in localStorage
      history.push(`/VerificationCode?email=${Email}`);
    } catch (error) {
      console.error(error);
      // TODO: handle error
    }
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Password Reset</h1>
            <p className="lead text-center"></p>
          </div>
          <div className="col-md-6 p-5">

            <form className onSubmit={handleSubmit}>
              <div className="mb-3">
                <div >
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary mb-3">
                    Verify
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailForm;