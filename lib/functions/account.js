const account = (client, errorHandler, debug) => {
  return {
    /**
    * Verify logged in credential
    ***/
    verifyCredentials: async function () {
      try {

        const response = await client.get('account/verify_credentials');

        if (debug) console.log('twitter hook - verify credentials: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    /**
    * get account settings
    ***/
    getAccountSettings: async function () {
      try {
        const response = await client.get('account/settings');

        if(debug) console.log('twitter hook - get account settings: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    /**
     * Get profile banner
     *
     * @param {string} screen_name
     **/
    getProfileBanner: async function (screen_name) {
      try {

        let options = ''

        if (screen_name) options = {screen_name}

        const response = await client.get('account/settings', options);

        if (debug) console.log('twitter hook - get profile banner: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    /**
    * remove profile banner
    ***/
    removeProfileBanner: async function () {
      try {
        const response = await client.post('account/remove_profile_banner');

        if (debug) console.log('twitter hook - response profile banner: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    /**
    * Update user profile
    *
    * @param {object} data
    **/
    updateProfile: async function (data) {
      try {
        const response = await client.post('account/update_profile', data);

        if (debug) console.log('twitter hook - update profile: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    /**
    * Update profile banner
    *
    * @param {object} banner
    * @param {object} options
    **/
    updateProfileBanner: async function (banner, options) {
      try {
        let opt = {banner}
        if (options) opt = {...opt, ...options}
        const response = await client.post('account/update_profile_banner', opt);

        if (debug) console.log('twitter hook - update profile banner: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    /**
    * Update profile image
    *
    * @param {object} image
    **/
    updateProfileImage: async function (image) {
      try {
        let opt = {image}
        const response = await client.post('account/update_profile_image', opt);

        if (debug) console.log('twitter hook - update profile image: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    }
  }
}

exports.account = account;