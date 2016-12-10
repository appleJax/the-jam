import { combineReducers } from 'redux'
import recipes from './recipes'
import visibilityFilter from './visibilityFilter'
import modal from './modal'

const rootReducer = combineReducers({
  recipes,
  visibilityFilter,
  modal
})

export default rootReducer
