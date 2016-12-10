import fetch from 'isomorphic-fetch'
// Synchronous Actions (Async at Bottom)
export const addRecipe = (recipe) => {
  return {
    type: 'ADD_RECIPE',
    recipe
  }
}

export const editRecipe = (recipe) => {
  return {
    type: 'EDIT_RECIPE',
    recipe
  }
}

export const deleteRecipe = (recipe) => {
  return {
    type: 'DELETE_RECIPE',
    recipe
  }
}

export const populateRecipes = (recipes) => {
  return {
    type: 'POPULATE_RECIPES',
    recipes
  }
}

export const toggleDetails = (id) => {
  return {
    type: 'TOGGLE_DETAILS',
    id
  }
}

export const setVisibilityFilter = (visibilityFilter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    visibilityFilter
  }
}

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  }
}

export const populateModal = (dialogue, content) => {
  return {
    type: 'POPULATE_MODAL',
    dialogue,
    content
  }
}

// Async Actions
export const fetchRecipes = (user) => {
  return dispatch => {
    // update UI... (todo)

    return fetch(`https://thejam.herokuapp.com/${user}/recipes`)
      .then(response => response.json())
      .then(json => dispatch(populateRecipes(json)))
      .catch(e => console.error(e))
  }
}

export const addUserRecipe = (user, recipe) => {
  return dispatch => {
    dispatch(addRecipe(recipe))

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

export const editUserRecipe = (user, recipe) => {
  return dispatch => {
    dispatch(editRecipe(recipe))

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

export const deleteUserRecipe = (user, recipe) => {
  return dispatch => {
    dispatch(deleteRecipe(recipe))

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
