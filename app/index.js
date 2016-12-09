import 'normalize-scss/sass/_normalize.scss'
import './index.sass'
import 'font-awesome/scss/font-awesome.scss'
//require('react-hot-loader/patch');

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import theJam from './reducers'
import App from './components/App'

let initialRecipeList = [
  {
    id: 1,
    name: 'Margherita Pizza',
    tags: ['pizza', 'vegetarian', 'cheese', 'tomatoes'],
    stars: 4,
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
    stars: 0,
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
    stars: 3,
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

const updateDB = (action) => {
  let url = '',
      data = '';
  function makeRequest(url, data, done) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = () => done(null, xhr.response);
    xhr.onerror = () => console.log(xhr.response);
    xhr.send(data);
  }

  switch (action.type) {
    case 'ADD_RECIPE':
      url = 'https://thejam.herokuapp.com/new',
      data = JSON.stringify(action.recipe);
      makeRequest(
        url,
        data,
        (err, response) => {
          if (err) throw err;
          console.log('Response: ', response);
      });
      store.dispatch(action);
      return;

    case 'EDIT_RECIPE':
      const newRecipe = Object.assign(
        {},
        action.recipe,
        {showDetails: false}
      );
      url = 'https://thejam.herokuapp.com/edit',
      data = JSON.stringify(newRecipe);
      makeRequest(
        url,
        data,
        (err, response) => {
          if (err) throw err;
          console.log('Edit response: ', response);
      });
      store.dispatch(action);
      return;

    case 'DELETE_RECIPE':
      url = 'https://thejam.herokuapp.com/delete',
      data = JSON.stringify({id: action.id});
      makeRequest(
        url,
        data,
        (err, response) => {
          if (err) throw err;
          console.log('Delete respones: ', response);
      });
      store.dispatch(action);
      return;

    default:
      store.dispatch(action);
      return;
  }
}

let store = createStore(recipeBox);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
}

/*
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
*/
