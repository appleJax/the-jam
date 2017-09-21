import React from 'react'
import fetch from 'isomorphic-fetch'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'
import { populateUserRecipes } from '../actions/sync'
import { Router, Route, browserHistory } from 'react-router'

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
  /*
      ** For Development ONLY **
      ** TODO: setup development db **

  store = configureStore({
    animation: {
      addToUserRecipes: ''
    },
    auth: {
      isAuthenticated: false,
      isFetching: false,
      id_token: null,
      name: null,
      email: null,
      errorMessage: ''
    },
    modal: {
      content: '',
      dialogue: '',
      show: false
    },
    recipes: {
      public: [{
        id: 1,
        name: 'test',
        stars: 3,
        votes: 1,
        time: {
          hours: 0,
          minutes: 15
        },
        calories: 0,
        servings: 0,
        tags: [],
        ingredients: ['onions', 'tomatoes', 'garlic'],
        directions: ['Mix ingredients together', 'Put it in the oven', 'Eat'],
        notes: ['What', "up"],
        author: 'Me',
        publisher: 'Me',
        showDetails: false
      }],
      private: []
    },
    sort: {
      asc: false,
      desc: false,
      stars: false
    },
    visibilityFilter: {
      active: 'public',
      content: ['']
    }
  })
  */
}

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
    </Router>
  </Provider>
)

export default Root
