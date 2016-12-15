import Auth0Lock from 'auth0-lock'

class AuthService {
  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:5000/',
//        redirect: false,
        responseType: 'code'
      },
      theme: {
        logo: 'https://thejam.herokuapp.com/images/hi_jam.gif'
      },
      languageDictionary: {
        title: 'the Jam',
        passwordInputPlaceholder: 'password',
        userNameInputPlaceholder: 'username'
      }
    })

//    this.lock.on('authenticated', this._doAuthentication.bind(this))

    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    this.lock.getProfile(authResult.idToken, (err, profile) => {
      if (err) return console.error(err)
      console.log('profile: ', JSON.stringify(profile))

      const user = { id_token: authResult.idToken },
            userProfile = JSON.stringify(profile)

      user.name = userProfile.name
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('profile', userProfile)
    })
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
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}

export default AuthService
