import { connect } from 'react-redux'
import {
  populateModal,
  setVisibilityFilter,
  toggleDetails
} from '../actions/sync'
import {
  editUserRecipe
} from '../actions/async'
import RecipeList from '../components/RecipeList'

const getVisibleRecipes = (recipes, filter, sort) => {
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
  ).sort((a, b) => {
    if (sort.stars && sort.asc) {
      if (a.stars == b.stars) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      }
      return b.stars - a.stars

    } else if (sort.stars && sort.desc) {
      if (a.stars == b.stars) {
        return a.name > b.name ? -1 : a.name < b.name ? 1 : 0
      }
      return b.stars - a.stars

    } else if (sort.asc) {
      if (a.name == b.name) return 0
      return a.name < b.name ? -1 : 1

    } else if (sort.desc) {
      if (a.name == b.name) return 0
      return a.name > b.name ? -1 : 1

    } else if (sort.stars) {
      return b.stars - a.stars

    } else {
      return 0
    }
  })
}

const mapStateToProps = (state) => {
  return {
    recipes: getVisibleRecipes(state.recipes, state.visibilityFilter, state.sort),
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
    editRecipe: (user, recipe) => dispatch(editUserRecipe(user, recipe)),
    toggleDetails: (id) => dispatch(toggleDetails(id))
  }
}

const VisibleRecipeList = connect(
  mapStateToProps,
  mapDispatchTProps
)(RecipeList)

export default VisibleRecipeList
