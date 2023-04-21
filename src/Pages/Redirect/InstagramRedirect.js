import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
const InstagramRedirect = () => {
    const [accessToken, setAccessToken] = React.useState(null);

    useEffect(() => {
        console.log('URL:', window.location.href);
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log('code', code);
    
        if (code) {
          const exchangeCodeForToken = async () => {
            const redirectUri = 'https://main--chipper-pie-1ad82e.netlify.app/';
            const appId = '1422036221904968';
            const appSecret = '438aa50628f6488b5cd05fce3992b6b1';
    
            try {
              const response = await axios.post('https://activeplushvolcano.rehasreekoneru.repl.co/api/exchange-code', {
                code,
                appId,
                appSecret,
                redirectUri,
              });
              console.log('response',response);
              setAccessToken(response.data.access_token);
            } catch (error) {
              console.error('Error exchanging code for token:', error);
            }
          };
    
          exchangeCodeForToken();
        }
      }, []);
  return (
    <div>InstagramRedirect</div>
  )
}

export default InstagramRedirect