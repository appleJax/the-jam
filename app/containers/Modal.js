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
    user: state.auth.email,
    username: state.auth.name
  })

const mapDispatchToProps = (dispatch) =>
  ({
    addRecipe: (user, recipe, active) =>
      dispatch(addUserRecipe(user, recipe, active)),

    editRecipe: (user, recipe, active) =>
      dispatch(editUserRecipe(user, recipe, active)),

    deleteRecipe: (user, id, active) =>
      dispatch(deleteUserRecipe(user, id, active)),

    closeModal: () => {
      document.body.classList.remove('no-scroll')
      dispatch(closeModal())
    },

    voteForRecipe: (user, vote, recipe, email) =>
      dispatch(voteForRecipe(user, vote, recipe, email)),

    unpublishRecipe: (user, recipe) =>
      dispatch(unpublishRecipe(user, recipe)),

    login: () => dispatch(auth0Login())
  })

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalOverlay)

export default Modal
