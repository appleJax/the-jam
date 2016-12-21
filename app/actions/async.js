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

    const altRecipe = {
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
        body: JSON.stringify({user, recipe: altRecipe})
      }
    )
    .catch(console.error)
  }
}

export const editUserRecipe = (user, recipe, active) => {
  return dispatch => {
    dispatch(editRecipe(recipe, active))

    const altRecipe = {
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
        body: JSON.stringify({user, recipe: altRecipe})
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

export const publishRecipe = (user, recipe) =>
  dispatch => {
    let author = 'anonymous'
    try {
      profile = localStorage.getItem('profile')
      author = profile ? JSON.parse(profile).name : 'anonymous'
    } catch(e) {
      console.error(e)
    }
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
    const altRecipe = {
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
        body: JSON.stringify({user, recipe: altRecipe})
      }
    )
    .catch(console.error)
  }

export const addToUserRecipes = (user, recipe) =>
  dispatch => {
    const altRecipe = {
      ...recipe,
      stars: 0,
      published: false,
      showDetails: false
    }
    delete altRecipe.votes
    delete altRecipe.author
    delete altRecipe._id

    dispatch(addRecipe(altRecipe, 'private'))

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
