import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import useLocalStorage from 'use-local-storage'




const HandleGithubLogin = () => {
  const clientId = 'YOUR_GITHUB_CLIENT_ID';
  const redirectUri = 'http://localhost9090/';
  const scope = 'user';

  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;


  window.location.href = url;
}


const Login = () => {

  // const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

  // const switchTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme)
  // }

  const history = useHistory()

  const GoogleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  const [user, setUser] = useState({
    email: '',
    password: '',
    token: ''
  });

  // Handle Input
  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value

    setUser({ ...user, [name]: value })
  }

  // Handle Login
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    try {
      const res = await fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({   
          email,
          password
        })
      });

      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials")
      } else if (res.status === 200) {
        window.alert("Login Successfull");
        const data = await res.json();
        localStorage.setItem("idfromtoken", data.idfromtoken);
        localStorage.setItem("emailfromtoken", data.emailfromtoken);
        history.push('/ProjectList');
        
        // Token is generated When we Logged In.
        // Now we need to create Schema for Messages
      }

    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Welcome Back</h1>
            <p className="lead text-center">Enter Your Credentials To Login</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/register"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Register
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={user.Email}
                  onChange={handleChange}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">

                <Link to="/ForgotPassword" className="btn btn-link">
                  Forgot password
                </Link>
              </div>
              <div className="mb-3 ">


                <Link to="/TermsAndConditions" className="btn btn-link">
                  Terms And Conditions
                </Link>

                <Link to="/payment" className="btn btn-link">
                    payment 
                    
                  </Link>
              
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
               
                  Login
                
              </button>
              {/* <i onClick={switchTheme} class='fas fa-toggle-on'></i> */}
              <center>
                <div className="form-text" >
                  Or you can
                </div>
              </center>


              <button className={styles.google_btn} onClick={GoogleAuth}>
                <img src="./assets/google.png" alt="google icon" />
                <span>Sign in with Google</span>
              </button>

              <button type="submit" className={styles.google_btn}>
                <img src="./assets/Github.png" alt="google icon" onClick={HandleGithubLogin} />
                <span>Sign in with Github</span>
              </button>



            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


