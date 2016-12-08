const recipe = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        id: action.recipe.id,
        name: action.recipe.name,
        tags: action.recipe.tags,
        stars: action.recipe.stars,
        servings: action.recipe.servings,
        ingredients: action.recipe.ingredients,
        directions: action.recipe.directions
      };

    case 'EDIT_RECIPE':
      if (state.id == action.recipe.id) {
        return action.recipe;
      }
      return state;

    case 'TOGGLE_DETAILS':
      if (state.id == action.id) {
        return Object.assign(
          {},
          state,
          {showDetails: !state.showDetails}
        );
      }
      return state;

    default:
      return state;
  }
};

const recipes = (state = initialRecipeList, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [
        ...state,
        recipe(undefined, action)
      ];
    case 'EDIT_RECIPE':
      return state.map(
        r =>
          recipe(r, action)
        );
    case 'DELETE_RECIPE':
      return state.filter(
        r => r.id !== action.id
      );
    case 'TOGGLE_DETAILS':
      return state.map(
        r =>
        recipe(r, action)
      );
    default:
      return state;
  }
};

export default recipes
