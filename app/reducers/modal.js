import {
  CLOSE_MODAL,
  POPULATE_MODAL
} from '../actions/sync'

const modal = (
  state = {
    show: false,
    dialogue: '',
    content: ''
  },
  action
) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        show: false,
        dialogue: '',
        content: ''
      };
    case POPULATE_MODAL:
      return {
        show: true,
        dialogue: action.dialogue,
        content: action.content
      };
    default:
      return state;
  }
}

export default modal
