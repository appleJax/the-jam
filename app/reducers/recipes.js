import {
  ADD_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  POPULATE_USER_RECIPES,
  TOGGLE_DETAILS,
  TRANSFER_RECIPE,
} from '../actions/sync'

const recipe = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return action.recipe
      //{
        // id: action.recipe.id,
        // name: action.recipe.name,
        // tags: action.recipe.tags,
        // stars: action.recipe.stars,
        // servings: action.recipe.servings,
        // ingredients: action.recipe.ingredients,
        // directions: action.recipe.directions
      //}

    case EDIT_RECIPE:
      if (state.id == action.recipe.id) {
        return action.recipe
      }
      return state

    case TOGGLE_DETAILS:
      if (state.id == action.id) {
        return {
          ...state,
          showDetails: !state.showDetails
        }
      }
      return state

    default:
      return state
  }
}

const recipes = (state = {
  public: [],
  private: []
},
action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        [action.active]: [
          ...state[action.active],
          recipe(undefined, action)
        ]
      }
    case EDIT_RECIPE:
      return {
        ...state,
        [action.active]: state[action.active].map(
          r =>
            recipe(r, action)
        )
      }
    case DELETE_RECIPE:
      return {
        ...state,
        [action.active]: state[action.active].filter(
          r => r.id !== action.recipe.id
        )
      }
    case POPULATE_USER_RECIPES:
      return {
        ...state,
        private: action.recipes
      }
    case TOGGLE_DETAILS:
      return {
        ...state,
        [action.active]: state[action.active].map(
          r =>
            recipe(r, action)
        )
      }
    default:
      return state
  }
}

export default recipes
