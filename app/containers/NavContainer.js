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

const mapStateToProps = (state) =>
  ({
    visibilityFilter: state.visibilityFilter,
    sort: state.sort,
    loggedIn: state.auth.isAuthenticated,
    name: state.auth.name
  })

const mapDispatchToProps = {
  setFilterContent,
  setFilterRecipes,
  setSort,
  populateModal,
  login: auth0Login,
  logout: logoutUser
}

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)

export default NavContainer
