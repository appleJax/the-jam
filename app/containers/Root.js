import React from 'react'
import fetch from 'isomorphic-fetch'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'
import { populateUserRecipes } from '../actions/sync'

const preloadedState = JSON.parse(window.__PRELOADED_STATE__)

const store = configureStore(preloadedState)

if (preloadedState.auth.isAuthenticated) {
  console.log('authenticated')
  const user = {}
  user.name = JSON.parse(localStorage.getItem('profile')).email

  fetch(`https://thejam.herokuapp.com/recipes`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(user)
    }
  )
  .then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server")
    }
    return response.json()
  })
  .then(recipes => {
    console.log(recipes);
    store.dispatch(populateUserRecipes(recipes))
  })
}

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
