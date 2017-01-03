import { connect } from 'react-redux'
import {
  addUserRecipe,
  editUserRecipe,
  deleteUserRecipe,
  voteForRecipe,
  unpublishRecipe
} from '../actions/async'
import { closeModal } from '../actions/sync'
import { auth0Login } from '../actions/auth'
import ModalOverlay from '../components/ModalOverlay'

const mapStateToProps = (state) =>
  ({
    dialogue: state.modal.dialogue,
    content: state.modal.content,
    active: state.visibilityFilter.active,
    user: state.auth.email || state.auth.name,
    username: state.auth.name
  })

const mapDispatchToProps = {
  addRecipe: addUserRecipe,
  editRecipe: editUserRecipe,
  deleteRecipe: deleteUserRecipe,
  closeModal,
  voteForRecipe,
  unpublishRecipe,
  login: auth0Login
}

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalOverlay)

export default Modal
