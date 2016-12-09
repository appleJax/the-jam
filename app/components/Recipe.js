import React from 'react'

const Recipe = ({
  recipe,
  visibilityFilter,
  confirmDelete,
  setVisibilityFilter,
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
         setVisibilityFilter(
           visibilityFilter.concat(e.target.innerHTML)
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
      <span
        className='edit'
        onClick={populateModal}
      >
        <i className='fa fa-pencil'></i>
      </span>
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

            if (newStars == 1) {
              editedRecipe.stars = 0
            } else {
              editedRecipe.stars = newStars
            }
              editRecipe(editedRecipe)
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
            editRecipe(editedRecipe)
          }}
        >
        </i>
      )
    }
  }

  return (
    <li className='recipe'>
      <div className='recipe__header'>
        <span
          className='delete'
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
        id='expand-toggle'
        className={
          showDetails ?
          'fa fa-toggle-up' :
          'fa fa-ellipsis-h'
        }
      >
      </i>
      {starIcons}
      {details}
    </li>
  );
}

module.exports = Recipe;
