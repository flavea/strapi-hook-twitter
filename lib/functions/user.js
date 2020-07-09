const user = (client, errorHandler, debug) => {
  return {
    lookupUser: async function (screen_name) {
      try {
        const response = await client.get('users/lookup', {
          screen_name
        });

        if (debug) console.log('twitter hook - user lookup: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    searchUser: async function (q) {
      try {
        const response = await client.get('users/search', {
          q
        });

        if (debug) console.log('twitter hook - search user: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    showUser: async function (screen_name) {
      try {
        const response = await client.get('users/show', {
          screen_name
        });

        if (debug) console.log('twitter hook - user lookup: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
  }
}

exports.user = user;
