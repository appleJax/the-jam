import Auth0Lock from 'auth0-lock'

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
    window.localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return window.localStorage.getItem('id_token')
  }

  logout() {
    window.localStorage.removeItem('id_token')
  }
}

export default AuthService
