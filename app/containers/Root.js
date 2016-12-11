import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureReduxStore'
import App from './App'

const preloadedState = window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
