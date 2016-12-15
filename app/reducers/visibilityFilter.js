import {
  SET_FILTER_CONTENT,
  SET_FILTER_RECIPES
 } from '../actions/sync'

const visibilityFilter = (state = {
  active: 'public',
  content: ['']
},
  action
) => {
  switch (action.type) {
    case SET_FILTER_CONTENT:
      return {
        ...state,
        content: action.content
      }
    case SET_FILTER_RECIPES:
      return {
        ...state,
        active: action.recipes
      }
    default:
      return state
  }
}

export default visibilityFilter
