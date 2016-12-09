import 'normalize-scss/sass/_normalize.scss'
import ('./index.sass'
import 'font-awesome/scss/font-awesome.scss'
//require('react-hot-loader/patch');

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import theJam from './reducers'
import App from './components/App'

const updateDB = (action) => {
  let url = '',
      data = '';
  function makeRequest(url, data, done) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = () => done(null, xhr.response);
    xhr.onerror = () => console.log(xhr.response);
    xhr.send(data);
  }

  switch (action.type) {
    case 'ADD_RECIPE':
      url = 'https://thejam.herokuapp.com/new',
      data = JSON.stringify(action.recipe);
      makeRequest(
        url,
        data,
        (err, response) => {
          if (err) throw err;
          console.log('Response: ', response);
      });
      store.dispatch(action);
      return;

    case 'EDIT_RECIPE':
      const newRecipe = Object.assign(
        {},
        action.recipe,
        {showDetails: false}
      );
      url = 'https://thejam.herokuapp.com/edit',
      data = JSON.stringify(newRecipe);
      makeRequest(
        url,
        data,
        (err, response) => {
          if (err) throw err;
          console.log('Edit response: ', response);
      });
      store.dispatch(action);
      return;

    case 'DELETE_RECIPE':
      url = 'https://thejam.herokuapp.com/delete',
      data = JSON.stringify({id: action.id});
      makeRequest(
        url,
        data,
        (err, response) => {
          if (err) throw err;
          console.log('Delete respones: ', response);
      });
      store.dispatch(action);
      return;

    default:
      store.dispatch(action);
      return;
  }
}

let store = createStore(recipeBox);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
}

/*
if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    const NextRootContainer = require('./components/App.js');

    ReactDOM.render(
      <NextRootContainer
        {...store.getState()}
        updateStore={store.dispatch}
      />,
      document.getElementById('app')
    );
  });
}
*/
