import fetch from 'isomorphic-fetch'
import Auth0Lock from 'auth0-lock'
import {
  AUTH0_ID,
  AUTH0_DOMAIN
} from '../../env'

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'

// -- Sync --
export const requestCreateUser = (creds) => {
  return {
    type: CREATE_USER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export const receiveCreateUser = (user) => {
  return {
    type: CREATE_USER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export const rejectCreateUser = (error) => {
  return {
    type: CREATE_USER_ERROR,
    isFetching: false,
    isAuthenticated: false,
    error
  }
}

export const requestLogin = (creds) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    id_token: user.id_token,
    name: user.name
  }
}

export const rejectLogin = (error) => {
  return {
    type: LOGIN_ERROR,
    isFetching: false,
    isAuthenticated: false,
    error
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const showLock = () => {
  return {
    type: SHOW_LOCK
  }
}

export const lockSuccess = (profile, token) => {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
}

export const lockError = (err) => {
  return {
    type: LOCK_ERROR,
    err
  }
}

// -- Async --
// Calls the API to get a token and
// dispatches actions along the way
export const createUser = (creds) => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestCreateUser(creds))

    return fetch('http://thejam.herokuapp.com/users', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(rejectCreateUser(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in storage
          // and update UI
          localStorage.setItem('id_token', user.id_token)
        }
      }).catch(e => console.error(e))
  }
}

export const loginUser = (creds) => {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://thejam.herokuapp.com/sessions/create', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(rejectLogin(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in storage
          // and dispatch the success action
          localStorage.setItem('id_token', user.id_token)
        }
      }).catch(e => console.error(e))
  }
}

export const auth0Login = () => {
  const options = {
    auth: {
      redirectUrl: 'https://thejam.herokuapp.com/',
      responseType: 'token',
      params: {
        scope: 'openid email username name'
      }
    },
    theme: {
      logo: 'https://thejam.herokuapp.com/images/hi_jam.gif'
    },
    languageDictionary: {
      title: 'the Jam',
      passwordInputPlaceholder: 'password',
      userNameInputPlaceholder: 'username'
    }
  }
  console.log('Login called')
  const lock = new Auth0Lock(AUTH0_ID, AUTH0_DOMAIN, options)

  return dispatch => {
    console.log('Dispatch called')
    lock.on('authenticated', (authResult) => {
      console.log('Lock is authenticated')
      lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
          // Handle error
          console.error(error)
          return;
        }
        console.log('GetProfile returned')

        // Save token and profile locally
        localStorage.setItem("idToken", authResult.idToken)
        localStorage.setItem("profile", JSON.stringify(profile))
        const user = {}
        user.name = profile.username || profile.name
        user.id_token = authResult.idToken

        dispatch(receiveLogin(user))
      })
    })

    lock.on('authorization_error', function(error) {
      lock.show({
        flashMessage: {
          type: 'error',
          text: error.error_description
        }
      })
    })

    lock.show()
  }
}

export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem('idToken')
    localStorage.removeItem('profile')
    localStorage.removeItem('user-recipes')

    dispatch(logout())
    return
  }
}
