# Memories App

1. Create a `.env` file with relevant database values,
```conf
REACT_APP_MLAB_USERNAME = <someusername>
REACT_APP_MLAB_PASSWORD = <somepassword>
REACT_APP_MLAB_DB_ADDRESS = <gotosomedatabaseaddress>
```
2. Create an `.auth0.config.js` file inside `src/functions`
```javascript
export const AuthConfig = {
  domain: 'nicklemmon.auth0.com',
  clientId: 'rQ8hU5wWbRjyA1UUVB0gGt7yOz35SKfH',
  callbackUrl: 'http://localhost:3000/callback',
  dbConnectionName: 'Username-Password-Authentication',
}
```
3. Run `npm install`,
4. Then, `npm run start-dev` to get to work.