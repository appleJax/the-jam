import 'normalize-scss/sass/_normalize.scss'
import 'font-awesome/scss/font-awesome.scss'
import './index.sass'

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
//import 'react-hot-loader/patch'

render(
  <Root />,
  document.getElementById('root')
)

/*
if (module.hot) {
  module.hot.accept('./containers/Root.js', () => {
    const NextRoot = require('./containers/Root.js')

    render(
      <NextRoot />,
      document.getElementById('root')
    )
  })
}
*/
