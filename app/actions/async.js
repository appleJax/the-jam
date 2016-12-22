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
    .catch(console.error)
  }
}

export const addUserRecipe = (user, recipe, active) => {
  return dispatch => {
    dispatch(addRecipe(recipe, active))

    const newRecipe = {
      ...recipe,
      showDetails: false
    }

    return fetch(`https://thejam.herokuapp.com/new`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user, recipe: newRecipe})
      }
    )
    .catch(console.error)
  }
}

export const editUserRecipe = (user, recipe, active) => {
  return dispatch => {
    dispatch(editRecipe(recipe, active))

    const newRecipe = {
      ...recipe,
      showDetails: false
    }

    return fetch(`https://thejam.herokuapp.com/edit`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user, recipe: newRecipe})
      }
    )
    .catch(console.error)
  }
}

export const deleteUserRecipe = (user, recipe, active) =>
  dispatch => {
    dispatch(deleteRecipe(recipe, active))

    return fetch(`https://thejam.herokuapp.com/delete`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user, recipe})
      }
    )
    .catch(console.error)
  }

export const publishRecipe = (user, recipe, author) =>
  dispatch => {
    const publicRecipe = {
      ...recipe,
      votes: {},
      author
    }
    delete publicRecipe.stars
    delete publicRecipe._id

    const privateRecipe = {
      ...recipe,
      published: true
    }
    delete privateRecipe._id

    dispatch(addRecipe(publicRecipe, 'public'))
    dispatch(editRecipe(privateRecipe, 'private'))

    publicRecipe.showDetails = false
    privateRecipe.showDetails = false

    fetch(`https://thejam.herokuapp.com/new`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user: 'public', recipe: publicRecipe})
      }
    )
    .catch(console.error)

    fetch(`https://thejam.herokuapp.com/edit`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user, recipe: privateRecipe})
      }
    )
    .catch(console.error)
  }

export const unpublishRecipe = (user, recipe) =>
  dispatch => {
    const newRecipe = {
      ...recipe,
      published: false
    }
    delete altRecipe._id

    dispatch(deleteRecipe(recipe, 'public'))
    dispatch(editRecipe(altRecipe, 'private'))

    altRecipe.showDetails = false

    fetch(`https://thejam.herokuapp.com/delete`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user: 'public', recipe})
      }
    )
    .catch(console.error)


    fetch(`https://thejam.herokuapp.com/edit`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user, recipe: newRecipe})
      }
    )
    .catch(console.error)
  }

export const addToUserRecipes = (user, recipe) =>
  dispatch => {
    const newRecipe = {
      ...recipe,
      stars: 0,
      published: false,
      showDetails: false,
      id: Date.now()
    }
    delete altRecipe.votes
    delete altRecipe.author
    delete altRecipe._id

    dispatch(addRecipe(newRecipe, 'private'))

    return fetch(`https://thejam.herokuapp.com/new`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user, recipe: altRecipe})
      }
    )
    .catch(console.error)
  }

export const voteForRecipe = (user, vote, recipe) =>
  dispatch => {
    const votes = recipe.votes

    votes[user] = vote

    const newRecipe = {
      ...recipe,
      votes
    }
    delete newRecipe._id

    dispatch(editRecipe(newRecipe, 'public'))
    newRecipe.showDetails = false

    fetch(`https://thejam.herokuapp.com/edit`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({user: 'public', recipe: newRecipe})
      }
    )
    .catch(console.error)
  }
