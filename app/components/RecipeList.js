import React from 'react'
import PrivateRecipe from './PrivateRecipe'
import PublicRecipe from './PublicRecipe'

const RecipeList = ({
  recipes,
  visibilityFilter,
  user,
  username,
  privateView,
  loggedIn,
  setFilterContent,
  editRecipe,
  toggleDetails,
  populateModal,
  publishRecipe,
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
          publishRecipe={() => publishRecipe(user, recipe, username)}
          unpublishConfirm={() => populateModal('unpublish', recipe)}
        /> :
        <PublicRecipe
          key={i}
          recipe={recipe}
          visibilityFilter={visibilityFilter}
          user={user}
          username={username}
          loggedIn={loggedIn}
          setFilterContent={setFilterContent}
          toggleDetails={() => toggleDetails(recipe.id, visibilityFilter.active)}
          addToUserRecipes={() => addToUserRecipes(user, recipe)}
          unpublishConfirm={() => populateModal('unpublish', recipe)}
          voteDialogue={() => populateModal('vote', recipe)}
          loginDialogue={() => populateModal('login')}
        />
      )}
    </ul>
  )
}

export default RecipeList
