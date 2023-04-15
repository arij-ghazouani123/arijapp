import React, { useState, Suspense } from 'react';

import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Navbar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };
  const handleLogout = () => {
    // handle logout logic here
    // and redirect to login page
    history.push('/login');
   
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">{t('Home')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">{t('About')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/service">{t('Services')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">{t('Contact')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Second">{t('Dashboard')}</NavLink>
              </li>
            </ul>

            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">{t('BUILD-LAB')}</NavLink>

            {location.pathname === '/dashboard' ? (
              <>
                <NavLink to="/Profile" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className="fa fa-cog"></i> {t('Profile')}
                </NavLink>
                <NavLink to="/SettingsPage" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className="fa fa-cog"></i> {t('Settings')}
                </NavLink>
                <button className="btn btn-outline-primary ms-2 px-4 rounded-pill" onClick={handleLogout}>
                  <i className="fa fa-sign-out"></i> {t('Logout')}
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                  <i className="fa fa-sign-in me-2"></i>{t('Login')}
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className="fa fa-user-plus me-2"></i>{t('Register')}
                </NavLink>
              </>
            )}

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
