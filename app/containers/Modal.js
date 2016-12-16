import { connect } from 'react-redux'
import {
  addUserRecipe,
  editUserRecipe,
  deleteUserRecipe
} from '../actions/async'
import {
  closeModal
} from '../actions/sync'
import ModalOverlay from '../components/ModalOverlay'

const profile = localStorage.getItem('profile'),
      user = profile ? JSON.parse(profile).email : null

const mapStateToProps = (state) => {
  return {
    dialogue: state.modal.dialogue,
    content: state.modal.content,
    active: state.visibilityFilter.active,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: (user, recipe, active) =>
      dispatch(addUserRecipe(user, recipe, active)),

    editRecipe: (user, recipe, active) =>
      dispatch(editUserRecipe(user, recipe, active)),

    deleteRecipe: (user, id, active) =>
      dispatch(deleteUserRecipe(user, id, active)),

    closeModal: () => {
      document.body.classList.remove('no-scroll')
      dispatch(closeModal())
    }
  }
}

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalOverlay)

export default Modal
