import fetch from 'isomorphic-fetch'

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'

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
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export const rejectLogin = (error) = > {
  return {
    type: LOGIN_ERROR,
    isFetching: false,
    isAuthenticated: false,
    error
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
    isFetching: false,
    isAuthenticated: false
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
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          // Dispatch the success action
          dispatch(receiveCreateUser(user))
        }
      }).catch(err => console.log("Error: ", err))
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
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem('id_token')
    dispatch(logout())
  }
}
