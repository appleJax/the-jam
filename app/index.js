require('normalize-scss/sass/_normalize.scss');
require('./index.sass');
require('react-hot-loader/patch');

let React = require('react'),
    ReactDOM = require('react-dom'),
    App = require('./components/App'),
    createStore = require('redux').createStore;

let initialRecipeList = [
  {
    id: 1,
    name: 'Margherita Pizza',
    tags: ['pizza', 'vegetarian', 'cheese', 'tomatoes'],
    servings: 2,
    ingredients: ['1 cup flour', '1 cup beer', '1 Tbsp salt', '1 Tbsp yeast',
      '1 1/2 cups tomato sauce', '1 1/2 cups mozzarella cheese',
      '1/2 cup cherry tomatoes', '1/2 cup fresh basil leaves'],
    directions: [
      "Pour beer into microwave-safe measuring cup and heat to 110F.",
      "Mix flour, beer, salt, and yeast together, and knead for 10 minutes.",
      "Cover dough with warm wet towel and let rest for 30 minutes.",
      "Preheat oven to 450F.",
      "Roll dough out flat, cut cherry tomatoes in half, and layer tomato sauce, cheese, cherry tomatoes, and  basil onto the dough.",
      "Bake for 10-15 minutes."
    ],
    showDetails: false
  }
];

const modifyRecipe = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        id: new Date().getTime(),
        name: action.name,
        tags: action.tags,
        servings: action.servings,
        ingredients: action.ingredients,
        directions: action.directions,
        showDetails: false
      };

    case 'EDIT_RECIPE':
      if (state.id == action.id) {
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

const modifyRecipes = (state = initialRecipeList, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [
        ...state,
        modifyRecipe(undefined, action)
      ];
    case 'EDIT_RECIPE':
      return state.map(
        recipe => {
          modifyRecipe(recipe, action)
      });
    case 'DELETE_RECIPE':
      return state.filter(
        recipe => recipe.id !== action.id
      );
    case 'TOGGLE_DETAILS':
      return state.map(recipe => modifyRecipe(recipe, action));
    default:
      return state;
  }
};

const render = () => {
  ReactDOM.render(
    <App
      state={store.getState()}
      updateStore={store.dispatch}
    />,
    document.getElementById('app')
  );
};

let store = createStore(modifyRecipes);
store.subscribe(render);

render();

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    const NextRootContainer = require('./components/App.js');

    ReactDOM.render(
      <NextRootContainer
        store={store.getState()}
        updateStore={store.dispatch}
      />,
      document.getElementById('app')
    );
  });
}
