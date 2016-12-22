import {
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/auth'

const auth = (
  state = {
    isFetching: false,
    isAuthenticated: false,
    id_token: null,
    name: null,
    email: null,
    errorMessage: ''
  },
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        id_token: action.id_token,
        name: action.name,
        email: action.email,
        errorMessage: ''
      }
    case LOGOUT:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        id_token: null,
        name: null,
        email: null,
        errorMessage: ''
      }
    default:
      return state
  }
}

export default auth
