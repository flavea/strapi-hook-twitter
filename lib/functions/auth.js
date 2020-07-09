const auth = (client, errorHandler, debug) => {
  return {
    getBearerToken: async function () {
      try {
        const response = await client.getBearerToken();

        if (debug) console.log('twitter hook - get bearer token: ', response)

        if (response.access_token) {
          return Promise.resolve(response.access_token)
        } else {
          return Promise.reject('No access token.')
        }
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    OAuth: async function (callback_url) {
      try {
        const response = await client.getRequestToken(callback_url);

        if (debug) console.log('twitter hook - get OAuth: ', response)

        if (response.oauth_token && response.oauth_token_secret) {
          const data = {
            token: response.oauth_token,
            token_secret: response.oauth_token_secret
          }
          
          return Promise.resolve(data)
        } else {
          return Promise.reject('No access token.')
        }
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    getAccessToken: async function (oauthVerifier, oauthToken) {
      try {
        const response = await client
          .getAccessToken({
            oauth_verifier: oauthVerifier,
            oauth_token: oauthToken
          });

        if (debug) console.log('twitter hook - get Access Token: ', response)

        if (response.oauth_token) {
          const data = {
            access_token: response.oauth_token,
            access_token_secret: response.oauth_token_secret,
            user_id: response.user_id,
            screen_name: response.screen_name
          }

          return Promise.resolve(data)
        } else {
          return Promise.reject('No access token.')
        }
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
  }
}

exports.auth = auth;
