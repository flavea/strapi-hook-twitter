# strapi-hook-twitter
This package is used to integrate twitter api to algolia.

- [strapi-hook-twitter](#strapi-hook-twitter)
- [setup](#setup)
- [future update](#future-update)
- [usage](#usage)
    + [Fetch Unlisted APIs](#fetch-unlisted-apis)
    + [Tweet](#tweet)
        * [send a tweet](#send-a-tweet)
        * [reply to a tweet/add to thread](#reply-to-a-tweet-add-to-thread)
        * [search tweets](#search-tweets)
    + [Account](#account)
        * [verify credentials](#verify-credentials)
        * [get account settings](#get-account-settings)
        * [get profile banner](#get-profile-banner)
        * [remove profile banner](#remove-profile-banner)
        * [update profile](#update-profile)
        * [update profile banner](#update-profile-banner)
        * [update profile image](#update-profile-image)
    + [Authentication](#authentication)
        * [get bearer token](#get-bearer-token)
        * [get oauth token](#get-oauth-token)
        * [get access token](#get-access-token)
    + [Timeline](#timeline)
        * [home timeline](#home-timeline)
        * [user timeline](#user-timeline)
        * [mentions timeline](#mentions-timeline)
    + [User search](#user-search)
        * [user lookup](#user-lookup)
        * [user search](#user-search)
        * [show user data](#show-user-data)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


# setup

- [Create an app on twitter](https://apps.twitter.com/)
- Get the consumer key, consumer secret, access token key, and access token secret from the app page
- Create or update ./config/hook.js in your algolia code folder, add the following data to the file:
```js
  module.exports = {
    settings: {
      ...
      "twitter": {
        "enabled": true, // set to enable the hook
        "debug": true, // to log the data
        "consumer_key": "consumer_key",
        "consumer_secret": "consumer_secret",
        "access_token_key": "access_token_key",
        "access_token_secret": "access_token_secret"
      }
    },
  };
```
- Use as service in models, etc

# future update

support for streams, create functions for all APIs

# usage
The functions will return the response of the API call.

### Fetch Unlisted APIs
For APIs that don't have a defined function in this package, you can call the API by executing the following code:

```js
strapi.services.twitter.execute(api_path, method, parameters);
```
| Parameter | Type | Required | Explanation | Values |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| api_path | string | yes | the name of the API | [Check the official twitter documentation](https://developer.twitter.com/en/docs), **example:** account/verify_credentials |
| method | string | yes | the API method | _post_ or _get_, also check the twitter doc |
| parameters | object | no | the parameter required by the api | check the twitter doc |

### Tweet
##### send a tweet
```js
strapi.services.twitter.tweet(status, attachment_url);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| status | string | yes | the tweet you want to send | 'Hello World' |
| attachment_url | string | no | link you want to include in the tweet | 'https://twitter.com/' |
##### reply to a tweet/add to thread
```js
strapi.services.twitter.tweet(status, tweet_id, attachment_url);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| status | string | yes | the tweet you want to send | 'Hello World' |
| tweet_id | string | yes | the id of the tweet you want to reply to | '124343' |
| attachment_url | string | no | link you want to include in the tweet | 'https://twitter.com/' |
##### search tweets
```js
strapi.services.twitter.searchTweets(query, count, result_type);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| query | string | yes | your search query | 'Hello' |
| count | integer | no | the amount of tweets retrieved. default: 20 | '124343' |
| result_type | string | no | type of search results. Choices: mixed (default), recent, popular | 'mixed' |

### Account
##### verify credentials
```js
strapi.services.twitter.verifyCredentials();
```
##### get account settings
```js
strapi.services.twitter.getAccountSettings();
```
##### get profile banner
```js
strapi.services.twitter.getProfileBanner(screen_name);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| screen_name | string | yes | username of the twitter user | 'iarifiany' |

##### remove profile banner
```js
strapi.services.twitter.removeProfileBanner();
```
##### update profile
Data: object, check the [documentation](https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile) for the update data
```js
strapi.services.twitter.updateProfile(data);
```
example:
```js
strapi.services.twitter.updateProfile({ Name: 'Ilma'});
```
##### update profile banner
```js
strapi.services.twitter.updateProfileBanner(fileData);
```
##### update profile image
```js
strapi.services.twitter.updateProfileImage(fileData);
```
### Authentication
##### get bearer token
```js
strapi.services.twitter.getBearerToken();
```
##### get oauth token
```js
strapi.services.twitter.OAuth(callback_url);
```
| Parameter | Type | Required |Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| callback_url | string | yes | callback url | 'https://localhost:3000/callback' |
return:
```json
{
  token: oauth_token,
  token_secret: oauth_token_secret
}
```
##### get access token
```js
strapi.services.twitter.getAccessToken(oauthVerifier, oauthToken);
```
return:
```json
{
  access_token: oauth_token,
  access_token_secret: oauth_token_secret,
  user_id: user_id,
  screen_name: screen_name
}
```

### Timeline
##### home timeline
```js
strapi.services.twitter.getHomeTimeline(count);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| count | integer | no | number of tweets returned, default 20 | 5 |
##### user timeline
```js
strapi.services.twitter.getHomeTimeline(count, screen_name);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| count | integer | no | number of tweets returned, default 20 | 5 |
| screen_name | string | yes | username of the twitter user | 'iarifiany' |
##### mentions timeline
```js
strapi.services.twitter.getMentionTimeline(count);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| count | integer | no | number of tweets returned, default 20 | 5 |

### User search
##### user lookup
```js
strapi.services.twitter.lookupUser(screen_name);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| screen_name | string | yes | username of the twitter user | 'iarifiany' |
##### user search
```js
strapi.services.twitter.searchUser(query);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| query | string | yes | search query for user | 'iarifiany' |
##### show user data
```js
strapi.services.twitter.showUser(screen_name);
```
| Parameter | Type | Required | Explanation | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| screen_name | string | yes | username of the twitter user | 'iarifiany' |