import { connect } from 'react-redux'
import {
  addRecipe,
  editRecipe,
  deleteRecipe,
  closeModal
} from '../actions'
import ModalOverlay from '../components/ModalOverlay'

const mapStateToProps = (state) => {
  return {
    dialogue: state.modal.dialogue,
    content: state.modal.content
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: (recipe) => dispatch(addRecipe(recipe)),
    editRecipe: (recipe) => dispatch(editRecipe(recipe)),
    deleteRecipe: (id) => dispatch(deleteRecipe(id)),
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
