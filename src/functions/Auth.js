import auth0 from 'auth0-js';
import { AuthConfig } from './.auth0.config.js';
import history from './history.js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AuthConfig.domain,
    clientID: AuthConfig.clientId,
    redirectUri: AuthConfig.callbackUrl,
    audience: `https://${AuthConfig.domain}/userinfo`,
    responseType: 'token id_token'
  });

  constructor() {
    this.login = this.login.bind( this );
    this.logout = this.logout.bind( this );
    this.setSession = this.setSession.bind( this );
    this.handleAuthentication = this.handleAuthentication.bind( this );
    this.isAuthenticated = this.isAuthenticated.bind( this );
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash( ( err, authResults ) => {
      if ( authResults && authResults.accessToken && authResults.idToken ) {
        this.setSession( authResults )

        history.replace( '/addmemory' )
      } else if ( err ) {
        history.replace( '/')

        console.log( err )
      }
    });
  }

  setSession( authResult ) {
    const expiresAt = JSON.stringify(( authResult.expiresIn * 1000 ) + new Date().getTime())

    localStorage.setItem('access_token', authResult.accessToken )
    localStorage.setItem('id_token', authResult.idToken )
    localStorage.setItem('expires_at', expiresAt )
  }

  logout() {
    localStorage.removeItem( 'access_token' );
    localStorage.removeItem( 'id_token' );
    localStorage.removeItem( 'expires_at' );

    history.replace( '/' );
  }

  isAuthenticated() {
    const expiresAt = JSON.parse( localStorage.getItem( 'expires_at' ) );

    return new Date().getTime() < expiresAt;
  }
}