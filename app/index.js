require('normalize-scss/sass/_normalize.scss');
require('./index.sass');
require('react-hot-loader/patch');

const React = require('react'),
      ReactDOM = require('react-dom'),
      App = require('./components/App'),
      createStore = require('redux').createStore,
      combineReducers = require('redux').combineReducers;

const initialRecipeList = [
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

const recipe = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        id: action.recipe.id,
        name: action.recipe.name,
        tags: action.recipe.tags,
        servings: action.recipe.servings,
        ingredients: action.recipe.ingredients,
        directions: action.recipe.directions,
        showDetails: true
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

const modal = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return !state;
    case 'POPULATE_MODAL':
      return action.recipe;
    default:
      return state;
  }
};

const filter = (state = /.+/, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const render = () => {
  ReactDOM.render(
    <App
      {...store.getState()}
      updateStore={store.dispatch}
    />,
    document.getElementById('app')
  );
};

const recipeBox = combineReducers({
  recipes,
  filter,
  modal
});

const store = createStore(recipeBox);
store.subscribe(render);

render();

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    const NextRootContainer = require('./components/App.js');

    ReactDOM.render(
      <NextRootContainer
        {...store.getState()}
        updateStore={store.dispatch}
      />,
      document.getElementById('app')
    );
  });
}
