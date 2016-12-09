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