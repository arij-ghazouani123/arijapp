import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardNavbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container">
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/settings">Settings</NavLink>
            </li>
          </ul>
          <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">BUILD-LAB</NavLink>

          {props.auth ?
            <NavLink to="/logout" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
              <i className="fa fa-sign-out me-2"></i>Logout
            </NavLink>
            :
            <NavLink to="/login" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
              <i className="fa fa-sign-in me-2"></i>
            </NavLink>
          }
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;