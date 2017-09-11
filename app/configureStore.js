import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk' 
import api from './middleware/api'
import createLogger from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      api,
      loggerMiddleware
    )
  )
}

export default configureStore
