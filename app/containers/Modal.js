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

const mapStateToProps = (state) => {
  return {
    dialogue: state.modal.dialogue,
    content: state.modal.content
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: (user, recipe) => dispatch(addUserRecipe(user, recipe)),
    editRecipe: (user, recipe) => dispatch(editUserRecipe(user, recipe)),
    deleteRecipe: (user, id) => dispatch(deleteUserRecipe(user, id)),
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
