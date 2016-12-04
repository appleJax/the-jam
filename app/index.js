require('normalize-scss/sass/_normalize.scss');
require('./index.sass');
require('react-hot-loader/patch');

const React = require('react'),
      ReactDOM = require('react-dom'),
      App = require('./components/App'),
      createStore = require('redux').createStore,
      combineReducers = require('redux').combineReducers;

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
      'Pour beer into microwave-safe measuring cup and heat to 110F.',
      'Mix flour, beer, salt, and yeast together, and knead for 10 minutes.',
      'Cover dough with warm wet towel and let rest for 30 minutes.',
      'Preheat oven to 450F.',
      'Roll dough out flat, cut cherry tomatoes in half, and layer tomato sauce, cheese, cherry tomatoes, and  basil onto the dough.',
      'Bake for 10-15 minutes.'
    ],
    showDetails: false
  },
  {
    id: 2,
    name: 'Buffalo Chicken Dip',
    tags: ['chicken', 'appetizer', 'spicy', 'snack'],
    servings: 4,
    ingredients: ['2 chicken breasts (cooked and shredded)', '4oz Philadelphia cream cheese',
      '1/2 cup colby jack shredded cheese', '1/2 cup Buffalo Wild Wing sauce',
      '1/2 cup ranch dressing'],
    directions: ['Preheat oven to 350F','Mix everything together', 'Bake for 15 min'],
    showDetails: false
  },
  {
    id: 3,
    name: 'Cheesy Chicken Tortilla Soup',
    tags: ['chicken', 'cheese', 'soup', 'sides', 'mexican'],
    servings: 4,
    ingredients: ['1 package fajita mix', '1 pound chicken breast, shredded',
      '1 medium onion (chopped)', '1 stick butter', '1/3 cup flour', '2 cans chicken broth',
      '1 can diced tomatoes', '1/2 tsp chili powder', '1 cup Velveeta cheese',
      '1 1/2 cups colby jack cheese, divided in half', '1 cup milk', '1/2 cup half-and-half', 'tortilla chips'],
    directions: ['Precook chicken with fajita mix according to package',
      'In a large saucepan, cook onion in butter until tender. Stir in flour until blended.',
      'Stir in broth and bring to a boil.', 'Cook for 2 minutes, stirring occasionally.',
      'Add tomatoes, chili powder, Velveeta cheese, and 1/2 of the colby jack cheese. Cook until cheese is melted.',
      'Stir in milk, half-and-half, and chicken.', 'Continue to cook until heated through.',
      'Serve in bowls and garnish with crushed tortilla chips and the remaining colby jack cheese.'],
    showDetails: false
  }
];

function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}

if (storageAvailable('localStorage')) {
  if (localStorage.getItem('recipes')) {
    initialRecipeList = JSON.parse(localStorage.getItem('recipes'));
  }
}

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

const filter = (state = [''], action) => {
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
