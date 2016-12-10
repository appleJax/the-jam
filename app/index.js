import 'normalize-scss/sass/_normalize.scss'
import './index.sass'
import 'font-awesome/scss/font-awesome.scss'

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
// import 'react-hot-loader/patch'

render(
  <Root />,
  document.getElementById('app')
)

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
