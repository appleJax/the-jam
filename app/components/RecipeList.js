import React from 'react'
import PrivateRecipe from './PrivateRecipe'
import PublicRecipe from './PublicRecipe'

const RecipeList = ({
  recipes,
  visibilityFilter,
  user,
  name,
  privateView,
  setFilterContent,
  editRecipe,
  toggleDetails,
  populateModal,
  publishRecipe,
  unpublishRecipe,
  addToUserRecipes
}) => {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe, i) =>
        privateView ?
        <PrivateRecipe
          key={i}
          recipe={recipe}
          visibilityFilter={visibilityFilter}
          user={user}
          setFilterContent={setFilterContent}
          confirmDelete={() => populateModal('confirm', recipe.id)}
          editRecipe={editRecipe}
          toggleDetails={() => toggleDetails(recipe.id, visibilityFilter.active)}
          populateModal={() => populateModal('recipe', recipe)}
          publishRecipe={() => publishRecipe(user, recipe, name)}
          unpublishRecipe={() => unpublishRecipe(user, recipe)}
        /> :
        <PublicRecipe
          key={i}
          recipe={recipe}
          visibilityFilter={visibilityFilter}
          user={user}
          username={name}
          setFilterContent={setFilterContent}
          toggleDetails={() => toggleDetails(recipe.id, visibilityFilter.active)}
          unpublishRecipe={() => unpublishRecipe(user, recipe)}
          addToUserRecipes={() => addToUserRecipes(user, recipe)}
        />
      )}
    </ul>
  )
}

export default RecipeList
