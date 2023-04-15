import React, { useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const SettingsPage = () => {
  //const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState('user@example.com');
  const [username, setUsername] = useState('user123');
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  // const handleDarkModeChange = (event) => {
  //   setIsDarkMode(event.target.checked);
  // };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // save settings to backend here
    alert('Settings saved!');
  };
 
  return (
    <div className="settings-container">
      <h1>{t('generalSettings')}</h1>
      <button onClick={() => history.push('/dashboard')}>{t('returnToDashboard')}</button>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="languageSelect" className="form-label">{t('language')}</label>
          <select className="form-select" id="languageSelect" value={i18n.language} onChange={handleLanguageChange}>
            <option value="en">{t('english')}</option>
            <option value="fr">{t('french')}</option>
            <option value="chi">{t('chinese')}</option>
            <option value="ko">{t('korean')}</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          {/* <input type="checkbox" className="form-check-input" id="darkModeCheckbox" checked={isDarkMode} onChange={handleDarkModeChange} /> */}
          {/* <label className="form-check-label" htmlFor="darkModeCheckbox">{t('darkMode')}</label> */}
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">{t('email')}</label>
          <input type="email" className="form-control" id="emailInput" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">{t('username')}</label>
          <input type="text" className="form-control" id="usernameInput" value={username} onChange={handleUsernameChange} />
        </div>
        <button type="submit" className="btn btn-primary">{t('saveChanges')}</button>
      </form>
    </div>
  );
};

const SettingsPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPage />
    </Suspense>
  );
}

export default SettingsPageWithSuspense;
