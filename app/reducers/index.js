import { combineReducers } from 'redux'
import recipes from './recipes'
import visibilityFilter from './visibilityFilter'
import modal from './modal'

const theJam = combineReducers({
  recipes,
  visibilityFilter,
  modal
})

export default theJam
