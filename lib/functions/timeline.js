const timeline = (client, errorHandler, debug) => {
  return {
    getHomeTimeline: async function (count = 20) {
      try {
        const response = await client.get('statuses/home_timeline', {
          count,
          trim_user: false
        });

        console.log('twitter hook - get home timeline: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    getUserTimeline: async function (count = 20, screen_name) {
      try {
        let options = {
          count,
          trim_user: false
        }

        if (screen_name) options = {...options, screen_name}

        const response = await client.get('statuses/user_timeline', options);

        if (debug) console.log('twitter hook - get user timeline: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
    getMentionTimeline: async function (count = 20) {
      try {
        const response = await client.get('statuses/mentions_timeline', {
          count,
          trim_user: false
        });

        if (debug) console.log('twitter hook - get mentons timeline: ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
  }
}

exports.timeline = timeline;
