import React from 'react'
import RecipeBody from './RecipeBody'

const PublicRecipe = ({
  recipe,
  visibilityFilter,
  user,
  setFilterContent,
  toggleDetails,
  unpublishRecipe,
  addToUserRecipes
}) => {
  const {
    id,
    name,
    tags,
    votes,
    author,
    servings,
    ingredients,
    directions,
    showDetails
  } = recipe

  const tagList = tags.map(
    (tag, i) =>
    (<li
       key={i}
       onClick={ e =>
         setFilterContent(
           visibilityFilter.content.concat(e.target.innerHTML)
         )
       }
     >
       {tag}
     </li>
    )
  )

  const ingredientList = ingredients.map(
    (ingredient, i) =>
      <li key={i}>{ingredient}</li>
  )

  const directionList = directions.map(
    (direction, i) =>
      <li key={i}>{direction}</li>
  )

  const totalStars = 0
  const rating = 0
  const starIcons = []

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starIcons.push(
        <i className='fa fa-star fa-lg'
          key={i}
          data-value={i}
          onClick={ e => {
            const editedRecipe = recipe,
              newStars = e.target.dataset.value

            delete editedRecipe._id

            if (newStars == 1) {
              editedRecipe.stars = 0

            } else {
              editedRecipe.stars = newStars
            }
              editRecipe(user, editedRecipe, visibilityFilter.active)
          }}
        >
        </i>
      )
    } else {
      starIcons.push(
        <i className='fa fa-star-o fa-lg'
          key={i}
          data-value={i}
          onClick={ e => {
            const editedRecipe = recipe
            editedRecipe.stars = e.target.dataset.value
            delete editedRecipe._id

            editRecipe(user, editedRecipe, visibilityFilter.active)
          }}
        >
        </i>
      )
    }
  }

  return (
    <li
      key={id}
      className='recipe'>
      <div className='recipe__header'>
        <div
          className='recipe__button--add-to-my-recipes'
          onClick={addToUserRecipes}
        >
          <i className='fa fa-cloud-download'></i>
        </div>
        <h2 className='recipe__name'>
          {name}
        </h2>
        <ul className='tags'>
          {tagList}
        </ul>
      </div>
      <div className='recipe__control-bar'>
        <i
          onClick={toggleDetails}
          className={
            showDetails ?
            'recipe__expand-toggle fa fa-toggle-up fa-lg' :
            'recipe__expand-toggle fa fa-ellipsis-h fa-lg'
          }
        >
        </i>
        <div className='recipe__spacer'></div>
        <div
          className='recipe__votes'
        >
          10 Votes
        </div>
        {starIcons}
      </div>
      {showDetails &&
      <div>
        <RecipeBody
          servings={servings}
          ingredientList={ingredientList}
          directionList={directionList}
        />
        <span className='recipe__author'>
          Recipe By: {author}
        </span>
      </div>
      }
    </li>
  )
}

export default PublicRecipe