import React from 'react'
import fetch from 'isomorphic-fetch'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'
import { populateUserRecipes } from '../actions/sync'

const preloadedState = JSON.parse(window.__PRELOADED_STATE__)

const store = configureStore(preloadedState)

if (preloadedState.auth.isAuthenticated) {
  fetch(`https://thejam.herokuapp.com/recipes`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({user: preloadedState.profile.email})
    }
  )
  .then(json => store.dispatch(populateUserRecipes(json)))
  .catch(e => console.error(e))
}

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
