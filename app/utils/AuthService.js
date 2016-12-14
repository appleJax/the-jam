import Auth0Lock from 'auth0-lock'
import { authStore } from './localforage'

class AuthService {
  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'https://thejam.herokuapp.com/',
        responseType: 'token'
      }
    })

    this.lock.on('authenticated', this._doAuthentication.bind(this))

    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken)

    // Redirect or reload
  }

  login() {
    // Display login widget
    this.lock.show()
  }

  loggedIn() {
    // Is user logged in?
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(idToken) {
    authStore.setItem('id_token', idToken)
      .catch(e => console.error(e))
  }

  getToken() {
    return authStore.getItem('id_token')
      .catch(e => console.error(e))
  }

  logout() {
    authStore.removeItem('id_token')
      .catch(e => console.error(e))
  }
}

export default AuthService
