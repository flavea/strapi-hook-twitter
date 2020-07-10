const tweet = (client, errorHandler, debug) => {
  return {
    /**
     * Tweet something
     *
     * @param {string} tweet
     **/
    tweet: async function (tweet, attachment_url) {
      try {
        let options = {
          status: tweet
        }

        if (attachment_url) {
          options = {
            ...options,
            attachment_url
          }
        }

        const response = await client.post('statuses/update', options);

        if (debug) console.log('twitter hook - send tweet ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },

    /**
     * Add reply 
     *
     * @param {string} tweet
     * @param {string} mainTweetId
     **/
    reply: async function (tweet, mainTweetId, attachment_url) {
      try {
        let options = {
          status: tweet,
          in_reply_to_status_id: mainTweetId,
          auto_populate_reply_metadata: true
        }

        if (attachment_url) {
          options = {
            ...options,
            attachment_url
          }
        }

        const response = await client.post('statuses/update', options);

        if (debug) console.log('twitter hook - reply tweet ', response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },

    /**
     * Search for tweets
     *
     * @param {string} q
     * @param {number} count
     * @param {string} result_type
     **/
    searchTweets: async function (q, count = 20, result_type = 'mixed') {
      try {
        const response = await client.get('search/tweets', {
          q,
          count,
          result_type
        });

        if (debug) console.log(`twitter hook - search for ${q}: `, response)

        return Promise.resolve(response)
      } catch (error) {
        if (debug) errorHandler(error)
        return Promise.reject(error)
      }
    },
  }
}

exports.tweet = tweet;