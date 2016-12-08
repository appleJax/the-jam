import React from 'react'
import Nav from './Nav'
import VisibleRecipeList from '../containers/VisibleRecipeList'
import Modal from '..containers/Modal'
import Footer from './Footer'

const App = ({ modal }) => {
  render() {
    return (
      <div className="container">
        <Nav />
        <VisibleRecipeList />
        {
          modal.show ? <Modal /> : ''
        }
        <div className="spacer"></div>
        <Footer />
      </div>
    );
  }
}

module.exports = App;
