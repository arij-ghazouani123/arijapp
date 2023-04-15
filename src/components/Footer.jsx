import React, { useState, Suspense } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div>
      <footer className="footer text-white">
        <div className="container">
          <footer className="py-5">
            <div className="row">
              <div className="col-3">
                <h4>BUILD-LAB</h4>
                <select className="form-select" id="languageSelect" value={i18n.language} onChange={handleLanguageChange}>
                  <option value="en">{t('english')}</option>
                  <option value="fr">{t('french')}</option>
                  <option value="chi">{t('chinese')}</option>
                  <option value="ko">{t('korean')}</option>
                </select>
              </div>

              

              <div className="col-2">
                <h5>{t('Section')}</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <NavLink to="#" className="nav-link p-0 text-white">
                    {t('Home')}
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="#" className="nav-link p-0 text-white">
                    {t('Features')}
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="#" className="nav-link p-0 text-white">
                    {t('Pricing')}
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="#" className="nav-link p-0 text-white">
                      FAQs
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="#" className="nav-link p-0 text-white">
                      {t('About')}
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="col-4 offset-1">
                <form>
               
                  <h5>{t('Subscribe to our newsletter')}</h5>
                  <p>{t('Monthly digest of whats new and exciting from us.')}</p>
                  <div className="d-flex w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">
                      {t('Email address')}
                    </label>
                    <input
                      id="newsletter1"
                      type="text"
                      className="form-control"
                      placeholder="Email address"
                    />
                    <button
                      className="btn btn-primary rounded-pill px-4"
                      type="button"
                    >
                      {t('Subscribe')}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="d-flex justify-content-between pt-4 mt-4 border-top">
              <p>{t('© 2021 Company, Inc. All rights reserved.')}</p>
              <ul className="list-unstyled d-flex">
                <li className="ms-3">
                  <NavLink className="link-light" to="#">
                    <i className="fa fa-facebook fa-2x"></i>
                  </NavLink>
                </li>
                <li className="ms-3">
                  <NavLink className="link-light" to="#">
                    <i className="fa fa-instagram fa-2x"></i>
                  </NavLink>
                </li>
                <div className="mb-3">
                  

                </div>
                <li className="ms-3">
                  <NavLink className="link-light" to="#">
                    <i className="fa fa-twitter fa-2x"></i>
                  </NavLink>
                </li>
                
              </ul>
              
            </div>
          </footer>
        </div>
      </footer>
    </div>
  );
};
const FooterPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Footer  />
    </Suspense>
  );
}
export default FooterPageWithSuspense;
