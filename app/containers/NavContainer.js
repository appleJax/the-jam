import { connect } from 'react-redux'
import {
  setVisibilityFilter,
  setSort,
  populateModal
} from '../actions/sync'
import Nav from '../components/Nav'

const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.visibilityFilter,
    sort: state.sort
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setVisibilityFilter: (filter) => dispatch(setVisibilityFilter(filter)),
    setSort: (sortBy) => dispatch(setSort(sortBy)),
    populateModal: () => {
      document.body.classList.add('no-scroll')
      dispatch(populateModal('recipe', 'new'))
    }
  }
}

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)

export default NavContainer
