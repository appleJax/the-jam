import React from 'react'
import Recipe from './Recipe'

const RecipeList = ({
  recipes,
  visibilityFilter,
  populateModal,
  setVisibilityFilter,
  editRecipe,
  toggleDetails
}) => {
  return (
    <ul className="recipe-list">
      {recipes.map(recipe =>
        <Recipe
          key={recipe.id}
          recipe={recipe}
          visibilityFilter={visibilityFilter}
          confirmDelete={() => populateModal('confirm', recipe.id)}
          setVisibilityFilter={setVisibilityFilter}
          editRecipe={editRecipe}
          toggleDetails={() => toggleDetails(recipe.id)}
          populateModal={() => populateModal('recipe', recipe)}
        />
      )}
    </ul>
  )
}

module.exports = RecipeList
