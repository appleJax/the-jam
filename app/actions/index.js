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

export const deleteRecipe = (id) => {
  return {
    type: 'DELETE_RECIPE',
    id
  }
}

export const toggleDetails = (id) => {
  return {
    type: 'TOGGLE_DETAILS',
    id
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
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
