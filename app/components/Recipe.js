import React from 'react'

const Recipe = ({
  recipe,
  visibilityFilter,
  user,
  setFilterContent,
  confirmDelete,
  editRecipe,
  toggleDetails,
  populateModal
}) => {
  const {
    id,
    name,
    tags,
    stars,
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

  const details = showDetails ?
  (
    <div>
      <div className='ingredients'>
        <h3>Ingredients:</h3>
        <span className='servings'>
          {servings} {servings ? 'serving' : ''}
          {servings > 1 ? 's' : ''}
        </span>
        <ul>
          {ingredientList}
        </ul>
      </div>
      <div className='directions'>
        <h3>Directions:</h3>
        <ol>
          {directionList}
        </ol>
      </div>
      <div
        className='recipe__edit-button'
        onClick={populateModal}
      >
        <i className='fa fa-pencil'></i>
      </div>
    </div>
  ) : ''

  const starIcons = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= stars) {
      starIcons.unshift(
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
      starIcons.unshift(
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
        <span
          className='recipe__delete-button'
          onClick={confirmDelete}
        >
          <i className='fa fa-times'></i>
        </span>
        <h2 className='recipe__name'>
          {name}
        </h2>
        <ul className='tags'>
          {tagList}
        </ul>
      </div>
      <i
        onClick={toggleDetails}
        className={
          showDetails ?
          'recipe__expand-toggle fa fa-toggle-up fa-lg' :
          'recipe__expand-toggle fa fa-ellipsis-h fa-lg'
        }
      >
      </i>
      {starIcons}
      {details}
    </li>
  );
}

module.exports = Recipe;
