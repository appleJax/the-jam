import React from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import VisibleRecipeList from './VisibleRecipeList'
import Modal from './Modal'
import Footer from '../components/Footer'

let App = ({ modal }) => {
  return (
    <div className="container">
      <NavContainer />
      <VisibleRecipeList />
      {
        modal ? <Modal /> : ''
      }
      <div className="spacer"></div>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal.show
  }
}

App = connect(
  mapStateToProps,
  null
)(App)

export default App
