import { combineReducers } from 'redux'
import auth from './auth'
import recipes from './recipes'
import visibilityFilter from './visibilityFilter'
import sort from './sort'
import modal from './modal'
import animation from './animation'

const rootReducer = combineReducers({
  auth,
  recipes,
  visibilityFilter,
  sort,
  modal,
  animation
})

export default rootReducer
