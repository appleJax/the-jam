import { combineReducers } from 'redux'
import auth from './auth'
import recipes from './recipes'
import visibilityFilter from './visibilityFilter'
import sort from './sort'
import modal from './modal'

const rootReducer = combineReducers({
  auth,
  recipes,
  visibilityFilter,
  sort,
  modal
})

export default rootReducer
