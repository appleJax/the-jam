import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SHOW_LOCK,
  LOCK_SUCCESS,
  LOCK_ERROR
} from '../actions/auth'

import { isTokenExpired } from '../utils/jwtHelper'

const auth = (
  state = {
    isFetching: false,
    isAuthenticated: window.localStorage.getItem('id_token') &&
      !isTokenExpired(window.localStorage.getItem('id_token')) ?
      true : false
  },
  action
) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case CREATE_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error
      }
    case LOGOUT:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      }
    default:
      return state
  }
}

export default auth
