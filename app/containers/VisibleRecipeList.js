import { connect } from 'react-redux'
import {
  editRecipe,
  populateModal,
  toggleDetails
} from '../actions'
import RecipeList from '../components/RecipeList'

const getVisibleRecipes = (recipes, filter) => {
  const regex = filter.join('|')

  return recipes.filter(
    recipe => {
      const text = [
        recipe.name,
        ...recipe.tags,
        recipe.servings,
        ...recipe.ingredients
        ...recipe.directions
      ].join(' ')

      return text.match(new RegExp(regex, 'i'));
    }
  )
}

const mapStateToProps = (state) => {
  return {
    recipes: getVisibleRecipes(state.recipes, state.visibilityFilter)
  }
}

const mapDispatchTProps = (dispatch) => {
  return {
    editRecipe: (recipe) => dispatch(editRecipe(recipe)),
    confirmDelete: (dialogue, recipe) => dispatch(populateModal(dialogue, recipe)),
    toggleDetails: (id) => dispatch(toggleDetails(id))
  }
}

const VisibleRecipeList = connect(
  mapStateToProps,
  mapDispatchTProps
)(RecipeList)

export default VisibleRecipeList
