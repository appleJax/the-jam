import { combineReducers } from 'redux'
import recipes from './recipes'
import visibilityFilter from './visibilityFilter'
import sort from './sort'
import modal from './modal'

const rootReducer = combineReducers({
  recipes,
  visibilityFilter,
  sort,
  modal
})

export default rootReducer
