import React from 'react'
import Recipe from './Recipe'

const RecipeList = ({
  recipes,
  visibilityFilter,
  user,
  setFilterContent,
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
          user={user}
          setFilterContent={setFilterContent}
          confirmDelete={() => populateModal('confirm', recipe.id)}
          editRecipe={editRecipe}
          toggleDetails={() => toggleDetails(recipe.id, visibilityFilter.active)}
          populateModal={() => populateModal('recipe', recipe)}
        />
      )}
    </ul>
  )
}

module.exports = RecipeList
