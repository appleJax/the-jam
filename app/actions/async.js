import fetch from 'isomorphic-fetch'
import {
  addRecipe,
  editRecipe,
  deleteRecipe,
  populateUserRecipes
} from './sync'

export const fetchRecipes = (user) => {
  return dispatch => {
    // update UI... (todo)

    return fetch(`https://thejam.herokuapp.com/recipes`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(user)
      }
    )
    .then(json => dispatch(populateUserRecipes(json)))
    .catch(e => console.error(e))
  }
}

export const addUserRecipe = (user, recipe, active) => {
  return dispatch => {
    dispatch(addRecipe(recipe, active))

    return fetch(`https://thejam.herokuapp.com/new`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(recipe)
      }
    )
    .catch(e => console.error(e))
  }
}

export const editUserRecipe = (user, recipe, active) => {
  return dispatch => {
    dispatch(editRecipe(recipe, active))

    return fetch(`https://thejam.herokuapp.com/edit`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(recipe)
      }
    )
    .catch(e => console.error(e))
  }
}

export const deleteUserRecipe = (user, recipe, active) => {
  return dispatch => {
    dispatch(deleteRecipe(recipe,active))

    return fetch(`https://thejam.herokuapp.com/delete`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(recipe)
      }
    )
    .catch(e => console.error(e))
  }
}
