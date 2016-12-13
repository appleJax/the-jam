export const ADD_RECIPE = 'ADD_RECIPE'
export const EDIT_RECIPE = 'EDIT_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const POPULATE_RECIPE = 'POPULATE_RECIPES'
export const TOGGLE_DETAILS = 'TOGGLE_DETAILS'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const SET_SORT = 'SET_SORT'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const POPULATE_MODAL = 'POPULATE_MODAL'

export const addRecipe = (recipe) => {
  return {
    type: ADD_RECIPE,
    recipe
  }
}

export const editRecipe = (recipe) => {
  return {
    type: EDIT_RECIPE,
    recipe
  }
}

export const deleteRecipe = (recipe) => {
  return {
    type: DELETE_RECIPE,
    recipe
  }
}

export const populateRecipes = (recipes) => {
  return {
    type: POPULATE_RECIPES,
    recipes
  }
}

export const toggleDetails = (id) => {
  return {
    type: TOGGLE_DETAILS,
    id
  }
}

export const setVisibilityFilter = (visibilityFilter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    visibilityFilter
  }
}

export const setSort = (sortBy) => {
  return {
    type: SET_SORT,
    sortBy
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}

export const populateModal = (dialogue, content) => {
  return {
    type: POPULATE_MODAL,
    dialogue,
    content
  }
}
