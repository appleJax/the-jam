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
  populateModal,
  publishRecipe,
  unpublishConfirm
}) => {
  const {
    id,
    name,
    tags,
    stars,
    time,
    calories,
    servings,
    ingredients,
    directions,
    notes,
    author,
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
      onClick={unpublishConfirm}
    >
      <i className='fa fa-check-circle'></i>
      Published
    </div> :
    <div
      className='recipe__button--publish'
      onClick={publishRecipe}
    >
      <i className='fa fa-newspaper-o'></i>
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
              newStars = Number(e.target.dataset.value)

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
            editedRecipe.stars = Number(e.target.dataset.value)
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
      className='recipe'
    >
      <div className='recipe__header'>
        <div
          className='recipe__button--edit'
          onClick={populateModal}
        >
          <i className='fa fa-pencil'></i>
        </div>
        <h2 className='recipe__name'>
          {name}
        </h2>
        <ul className='tags'>
          {tagList}
        </ul>
      </div>
      <div className='recipe__control-bar'>
        {starIcons}
        {status}
        <div className='spacer'></div>
        <i
          onClick={toggleDetails}
          className={
            showDetails ?
            'recipe__expand-toggle fa fa-toggle-up fa-lg' :
            'recipe__expand-toggle fa fa-ellipsis-h fa-lg'
          }
        >
        </i>
      </div>
      <div className='spacer control-bar-spacer'></div>
      {showDetails &&
      <div>
        <RecipeBody
          time={time}
          calories={calories}
          servings={servings}
          ingredientList={ingredientList}
          directionList={directionList}
          notes={notes}
        />
      </div>
      }
      {showDetails &&
      <div className="spacer credits-spacer"></div>
      }
      {showDetails &&
      <div className='recipe__credits recipe__credits--private'>
        <div className='recipe__credits__author'>
          <i className='recipe__credits__icon fa fa-id-card-o'></i>
          Recipe By: <span className='credit-name'>{author}</span>
        </div>
        <div className='spacer'></div>
        <div
          className='recipe__delete-button'
          onClick={confirmDelete}
        >
          <i className='fa fa-times fa-lg'></i>
        </div>
      </div>
      }
    </li>
  )
}

export default PrivateRecipe
