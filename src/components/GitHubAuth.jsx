import { useState } from 'react';
import axios from 'axios';

function GitHubAuth(props) {
  const { onTokenChange } = props;
  const [accessToken, setAccessToken] = useState(null);

  const handleAuthClick = () => {
    const clientId = "Iv1.bdf21f535792be33";
    const redirectUri = "http://localhost:3000/dashboard";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
    window.location.replace(authUrl);
  };

  const handleAuthCallback = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (code) {
      try {
        const clientId = "Iv1.bdf21f535792be33";
        const clientSecret = "2fcc84eb2c67fc7bcccc9aaae4b8c80de7e3235c ";
        const redirectUri ="http://localhost:3000/dashboard";
        const response = await axios.post('https://github.com/login/oauth/access_token', {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          redirect_uri: redirectUri,
        }, {
          headers: {
            Accept: 'application/json'
          }
        });
        const { access_token } = response.data;
      
        setAccessToken(access_token);
       
        onTokenChange(access_token);
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogoutClick = () => {
    setAccessToken(null);
    onTokenChange(null);
  };

  if (window.location.search.includes('code=')) {
    handleAuthCallback();
    return (
      <div>

      </div>
    );
  }

  return (
    <div>
      {!accessToken && <button onClick={handleAuthClick}>Authorize with GitHub</button>}
      {accessToken && <div>Access token: {accessToken}</div>}
    </div>
  );
}

export default GitHubAuth;