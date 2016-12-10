import React from 'react'
import Recipe from './Recipe'

const RecipeList = ({
  recipes,
  visibilityFilter,
  setVisibilityFilter,
  editRecipe,
  toggleDetails,
  populateModal
}) => {
  return (
    <ul className="recipe-list">
      {recipes.map(recipe =>
        <Recipe
          key={recipe.id}
          recipe={recipe}
          visibilityFilter={visibilityFilter}
          setVisibilityFilter={setVisibilityFilter}
          confirmDelete={() => populateModal('confirm', recipe.id)}
          editRecipe={editRecipe}
          toggleDetails={() => toggleDetails(recipe.id)}
          populateModal={() => populateModal('recipe', recipe)}
        />
      )}
    </ul>
  )
}

module.exports = RecipeList
