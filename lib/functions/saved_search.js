const savedSearch = (client, errorHandler, debug) => {
  return {
    getSavedSearches: async function () {
      try {

        const get = await client.get('saved_searches/list');

        if (debug) console.log('twitter hook - get saved searches ', get)

        return Promise.resolve(get)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    showSavedSearch: async function (search_id) {
      try {

        const get = await client.get('saved_searches/show', {
          id: search_id
        });
        
        if (debug) console.log('twitter hook - show saved search: ', get)

        return Promise.resolve(get)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    createSavedSearch: async function (query) {
      try {
        const update = await client.post('saved_searches/create', {
          query
        });

        if (debug) console.log('twitter hook - create saved search: ', update)

        return Promise.resolve(update)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    deleteSavedSearch: async function (search_id) {
      try {
        const response = await client.post('saved_searches/destroy', {
          id: search_id
        });
        
        if (debug) console.log('twitter hook - delete saved search: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
  }
}

exports.savedSearch = savedSearch;
