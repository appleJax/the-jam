import React from 'react'
import RecipeBody from './RecipeBody'

const PrivateRecipe = ({
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
    published,
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

  const status = published ?
    <div
      className='recipe__button--unpublish'
      onClick={() => console.log('Unpublish')}
    >
      <i className='fa fa-check-circle'></i>
      Published
    </div> :
    <div
      className='recipe__button--publish'
      onClick={() => console.log('Publish')}
    >
      <i className='fa fa-id-card-o'></i>
      Publish
    </div>

  const starIcons = []

  for (let i = 1; i <= 5; i++) {
    if (i <= stars) {
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
      className='recipe'
    >
      <div className='recipe__header'>
        <div
          className='recipe__delete-button'
          onClick={confirmDelete}
        >
          <i className='fa fa-times'></i>
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
        {status}
        {starIcons}
      </div>
      {showDetails &&
      <div>
      <RecipeBody
        servings={servings}
        ingredientList={ingredientList}
        directionList={directionList}
      />
      <div
        className='recipe__button--edit'
        onClick={populateModal}
      >
        <i className='fa fa-pencil'></i>
      </div>
      </div>
      }
    </li>
  )
}

export default PrivateRecipe
