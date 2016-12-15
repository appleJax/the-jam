import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'

const preloadedState = window.__PRELOADED_STATE__,
      isAuthenticated = !!window.localStorage.getItem('id_token'),
      username = JSON.parse(window.localStorage.profile).username,
      userRecipes = window.localStorage.getItem('user-recipes') || []

preloadedState.auth.isAuthenticated = isAuthenticated
preloadedState.auth.name = username
preloadedState.recipes.private = userRecipes

const store = configureStore(preloadedState)

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
