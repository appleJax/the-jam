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

let user = 'public'

const mapStateToProps = (state) => {
  if (state.visibilityFilter.active === 'private') {
    try {
      const profile = localStorage.getItem('profile')
      user = profile ? JSON.parse(profile).email : 'public'

    } catch(e) {
      console.error(e)
    }
  }

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
