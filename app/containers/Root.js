import React from 'react'
import fetch from 'isomorphic-fetch'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'
import { populateUserRecipes } from '../actions/sync'

let store = ''

try {
  const preloadedState = JSON.parse(window.__PRELOADED_STATE__)

  store = configureStore(preloadedState)

  if (preloadedState.auth.isAuthenticated) {
    const request = {}
    request.user = preloadedState.auth.email || preloadedState.auth.name

    fetch(`https://thejam.herokuapp.com/recipes`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(request)
      }
    )
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(recipes => {
      store.dispatch(populateUserRecipes(recipes))
    })
    .catch(console.error)
  }
} catch(e) {
  store = configureStore()
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root
