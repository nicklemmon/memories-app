# Memories App

1. Create a `.env` file with relevant database values,
```conf
REACT_APP_MLAB_USERNAME = <someusername>
REACT_APP_MLAB_PASSWORD = <somepassword>
REACT_APP_MLAB_DB_ADDRESS = <gotosomedatabaseaddress>
```
2. Create an `.auth0-variables.js` file inside `src/functions`
```javascript
export const AUTH_CONFIG = {
  domain: '<auth0-domain>',
  clientId: '<client-id',
  callbackUrl: 'http://localhost:3000/callback',
  dbConnectionName: '<db-name>',
}
```
3. Run `npm install`,
4. Then, `npm run start-dev` to get to work.