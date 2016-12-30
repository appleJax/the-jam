export const ADD_RECIPE = 'ADD_RECIPE'
export const EDIT_RECIPE = 'EDIT_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const POPULATE_USER_RECIPES = 'POPULATE_USER_RECIPES'
export const TOGGLE_DETAILS = 'TOGGLE_DETAILS'
export const SET_FILTER_CONTENT = 'SET_FILTER_CONTENT'
export const SET_FILTER_RECIPES = 'SET_FILTER_RECIPES'
export const SET_SORT = 'SET_SORT'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const POPULATE_MODAL = 'POPULATE_MODAL'
export const TOGGLE_ADD_TO_USER_ANIME = 'TOGGLE_ADD_TO_USER_ANIME'

export const addRecipe = (recipe, active) =>
  ({
    type: ADD_RECIPE,
    recipe,
    active
  })

export const editRecipe = (recipe, active) =>
  ({
    type: EDIT_RECIPE,
    recipe,
    active
  })

export const deleteRecipe = (recipe, active) =>
  ({
    type: DELETE_RECIPE,
    recipe,
    active
  })

export const populateUserRecipes = (recipes) =>
  ({
    type: POPULATE_USER_RECIPES,
    recipes
  })

export const toggleDetails = (id, active) =>
  ({
    type: TOGGLE_DETAILS,
    id,
    active
  })

export const setFilterContent = (content) =>
  ({
    type: SET_FILTER_CONTENT,
    content
  })

export const setFilterRecipes = (recipes) =>
  ({
    type: SET_FILTER_RECIPES,
    recipes
  })

export const setSort = (sortBy) =>
  ({
    type: SET_SORT,
    sortBy
  })

export const closeModal = () =>
  ({
    type: CLOSE_MODAL
  })

export const populateModal = (dialogue, content) =>
  ({
    type: POPULATE_MODAL,
    dialogue,
    content
  })

export const toggleAddToUserAnime = () =>
  ({
    type: TOGGLE_ADD_TO_USER_ANIME
  })
