import fetch from 'isomorphic-fetch'

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
