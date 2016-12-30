import {
  TOGGLE_ADD_TO_USER_ANIME
} from '../actions/sync'

const animation = (
  state = {
    addToUserRecipes: ''
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_ADD_TO_USER_ANIME:
      return {
        addToUserRecipes: action.id
      };
    default:
      return state;
  }
}

export default animation
