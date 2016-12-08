import { connect } from 'react-redux'
import {
  editRecipe,
  deleteRecipe,
  closeModal
} from '../actions'
import ModalOverlay from '../components/ModalOverlay'
import ConfirmDialogue from '../components/ConfirmDialogue'
import RecipeForm from '../components/RecipeForm'

const getModalContent = (dialogue) => {
  return dialogue == 'confirm' ?
    <ConfirmDialogue /> :
    <RecipeForm />
}

const mapStateToProps = (state) => {
  return {
    content: getModalContent(state.modal.dialogue)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editRecipe: (recipe) => dispatch(editRecipe(recipe)),
    deleteRecipe: (id) => dispatch(deleteRecipe(id)),
    closeModal: () => dispatch(closeModal())
  }
}

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalOverlay)

export default Modal
