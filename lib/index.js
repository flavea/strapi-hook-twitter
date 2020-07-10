const Twitter = require('twitter-lite')
const account = require('./functions/account')
const auth = require('./functions/auth')
const saved_search = require('./functions/saved_search')
const timeline = require('./functions/timeline')
const tweet = require('./functions/tweet')
const user = require('./functions/user')

module.exports = strapi => {
  const hook = {
    /**
     * Default options
     **/

    defaults: {
      subdomain: "api",
      version: "1.1",
      consumer_key: "",
      consumer_secret: "",
      access_token_key: "",
      access_token_secret: "",
      debug: false
    },

    /**
     * Initialize the hook
     **/

    async initialize() {
      const settings = {
        ...this.defaults,
        ...strapi.config.hook.settings.twitter
      };

      if (!settings.consumer_key.length || !settings.consumer_secret.length || !settings.access_token_key.length || !settings.access_token_secret.length) {
        throw Error('Twitter hook could not be initialized, missing setting.');
      }

      const client = new Twitter(settings);

      const errorHandler = (e) => {
        if ('errors' in e) {
          if (e.errors[0].code === 88)
            console.error('twitter hook error: rate limit will reset on', new Date(e._headers.get('x-rate-limit-reset') * 1000));
          else console.error('twitter hook error: ', e)
        } else {
          console.error('twitter hook error: ', e)
        }
      }

      await client
        .get("account/verify_credentials")
        .then(results => {
          console.log("Twitter hook: verified as @", results.screen_name);
        })
        .catch(error => errorHandler(error));

      const accountFunc = account.account(client, errorHandler, settings.debug)
      const authFunc = auth.auth(client, errorHandler, settings.debug)
      const savedSearchFunch = saved_search.savedSearch(client, errorHandler, settings.debug)
      const timelineFunc = timeline.timeline(client, errorHandler, settings.debug)
      const tweetFunc = tweet.tweet(client, errorHandler, settings.debug)
      const userFunc = user.user(client, errorHandler, settings.debug)

      const executeFunc = async (api, method, parameters) => {
        try {
          let response = null

          if (method == 'get') {
            response = await client.get(api, parameters);
          } else if (method == 'post') {
            response = await client.post(api, parameters);
          } else {
            return Promise.reject('Method must be get or post')
          }

          if (response) {
            if (settings.debug) console.log(`twitter hook - execute ${method} '${api}': `, response)

            return Promise.resolve(response)
          }
        } catch (error) {
          if (settings.debug) errorHandler(error)
          return Promise.reject(error)
        }
        
      }

      strapi.services.twitter = {
        execute: executeFunc,
        ...accountFunc,
        ...authFunc,
        ...savedSearchFunch,
        ...timelineFunc,
        ...tweetFunc,
        ...userFunc
      };
    },
  };

  return hook;
};
