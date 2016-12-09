import { connect } from 'react-redux'
import {
  populateModal,
  setVisibilityFilter,
  editRecipe,
  toggleDetails
} from '../actions'
import RecipeList from '../components/RecipeList'

const getVisibleRecipes = (recipes, filter) => {
  const regex = filter
                .filter(val => val !== '')
                .join('|')

  return recipes.filter(
    recipe => {
      const text = [
        recipe.name,
        ...recipe.tags,
        recipe.servings,
        ...recipe.ingredients,
        ...recipe.directions
      ].join(' ')

      return text.match(new RegExp(regex, 'i'));
    }
  )
}

const mapStateToProps = (state) => {
  return {
    recipes: getVisibleRecipes(state.recipes, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

const mapDispatchTProps = (dispatch) => {
  return {
    populateModal: (dialogue, content) => {
      document.body.classList.add('no-scroll')
      dispatch(populateModal(dialogue, content))
    },
    setVisibilityFilter: (filter) => dispatch(setVisibilityFilter(filter)),
    editRecipe: (recipe) => dispatch(editRecipe(recipe)),
    toggleDetails: (id) => dispatch(toggleDetails(id))
  }
}

const VisibleRecipeList = connect(
  mapStateToProps,
  mapDispatchTProps
)(RecipeList)

export default VisibleRecipeList
