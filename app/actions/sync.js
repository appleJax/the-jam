export const ADD_RECIPE = 'ADD_RECIPE'
export const EDIT_RECIPE = 'EDIT_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const POPULATE_RECIPE = 'POPULATE_RECIPES'
export const TOGGLE_DETAILS = 'TOGGLE_DETAILS'
export const SET_FILTER_CONTENT = 'SET_FILTER_CONTENT'
export const SET_FILTER_RECIPES = 'SET_FILTER_RECIPES'
export const SET_SORT = 'SET_SORT'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const POPULATE_MODAL = 'POPULATE_MODAL'

export const addRecipe = (recipe, active) => {
  return {
    type: ADD_RECIPE,
    recipe,
    active
  }
}

export const editRecipe = (recipe, active) => {
  return {
    type: EDIT_RECIPE,
    recipe,
    active
  }
}

export const deleteRecipe = (recipe, active) => {
  return {
    type: DELETE_RECIPE,
    recipe,
    active
  }
}

export const populateRecipes = (recipes) => {
  return {
    type: POPULATE_RECIPES,
    recipes
  }
}

export const toggleDetails = (id, active) => {
  return {
    type: TOGGLE_DETAILS,
    id,
    active
  }
}

export const setFilterContent = (content) => {
  return {
    type: SET_FILTER_CONTENT,
    content
  }
}

export const setFilterRecipes = (recipes) => {
  return {
    type: SET_FILTER_RECIPES,
    recipes
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
