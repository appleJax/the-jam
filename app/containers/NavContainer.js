import { connect } from 'react-redux'
import {
  setVisibilityFilter,
  populateModal
} from '../actions'
import Nav from '../components/Nav'

const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setVisibilityFilter: (filter) => dispatch(setVisibilityFilter(filter)),
    populateModal: () => {
      dispatch(populateModal('recipe', 'new'))
      document.body.classList.add('no-scroll')
    }
  }
}

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)

export default NavContainer
