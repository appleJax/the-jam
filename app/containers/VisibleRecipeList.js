import { connect } from 'react-redux'
import {
  populateModal,
  setFilterContent,
  toggleDetails
} from '../actions/sync'
import {
  editUserRecipe,
  publishRecipe,
  unpublishRecipe,
  addToUserRecipes
} from '../actions/async'
import RecipeList from '../components/RecipeList'

const getVisibleRecipes = (recipes, visibilityFilter, sort) => {
  const regex = visibilityFilter.content
                .filter(val => val !== '')
                .join('|')

  const activeRecipes = recipes[visibilityFilter.active]

  return activeRecipes
    .filter(
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
  // let user = 'public'
  // try {
  //   const profile = localStorage.getItem('profile')
  //   user = profile ? JSON.parse(profile).email : 'public'
  //
  // } catch(e) {
  //   console.error(e)
  // }
  return {
    recipes: getVisibleRecipes(state.recipes, state.visibilityFilter, state.sort),
    visibilityFilter: state.visibilityFilter,
    user: state.auth.email,
    name: state.auth.name,
    privateView: state.visibilityFilter.active == 'private'
  }
}

const mapDispatchTProps = (dispatch) =>
  ({
    setFilterContent: (filter) =>
      dispatch(setFilterContent(filter)),

    editRecipe: (user, recipe, active) =>
      dispatch(editUserRecipe(user, recipe, active)),

    toggleDetails: (id, active) =>
      dispatch(toggleDetails(id, active)),

    populateModal: (dialogue, content) => {
      document.body.classList.add('no-scroll')
      dispatch(populateModal(dialogue, content))
    },

    publishRecipe: (user, recipe) =>
      dispatch(publishRecipe(user, recipe)),

    unpublishRecipe: (user, recipe) =>
      dispatch(unpublishRecipe(user, recipe)),

    addToUserRecipes: (user, recipe) =>
      dispatch(addToUserRecipes(user, recipe))
  })

const VisibleRecipeList = connect(
  mapStateToProps,
  mapDispatchTProps
)(RecipeList)

export default VisibleRecipeList
