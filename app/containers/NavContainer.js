import { connect } from 'react-redux'
import {
  setFilterContent,
  setFilterRecipes,
  setSort,
  populateModal
} from '../actions/sync'
import {
  auth0Login,
  logoutUser
} from '../actions/auth'
import Nav from '../components/Nav'

const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.visibilityFilter,
    sort: state.sort,
    loggedIn: state.auth.isAuthenticated,
    name: state.auth.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterContent: (filter) =>
      dispatch(setFilterContent(filter)),

    setFilterRecipes: (recipes) =>
      dispatch(setFilterRecipes(recipes)),

    setSort: (sortBy) =>
      dispatch(setSort(sortBy)),

    populateModal: () => {
      document.body.classList.add('no-scroll')
      dispatch(populateModal('recipe', 'new'))
    },

    login: () => dispatch(auth0Login()),
    logout: () => dispatch(logoutUser())
  }
}

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)

export default NavContainer
