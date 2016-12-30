import React from 'react'
import RecipeBody from './RecipeBody'

const PublicRecipe = ({
  recipe,
  visibilityFilter,
  user,
  username,
  loggedIn,
  setFilterContent,
  toggleDetails,
  addToUserRecipes,
  unpublishConfirm,
  voteDialogue,
  loginDialogue,
  addToUserAnime
}) => {
  const {
    id,
    name,
    tags,
    stars,
    votes,
    time,
    calories,
    servings,
    ingredients,
    directions,
    notes,
    author,
    publisher,
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

  const totalVotes = Object.keys(votes).length,
        starIcons = []

  for (let i = 1; i <= 5; i++) {
    if (i <= stars) {
      starIcons.push(
        <i className='fa fa-star fa-lg'
          key={i}
          data-value={i}
        >
        </i>
      )
    } else {
      starIcons.push(
        <i className='fa fa-star-o fa-lg'
          key={i}
          data-value={i}
        >
        </i>
      )
    }
  }

  const upperIcon = username == publisher ?
    <div
      className='recipe__button--mine-unpub'
      onClick={unpublishConfirm}
    >
      <i className='fa fa-user'></i>
    </div> :
    <div
      className='recipe__button--add-to-my-recipes'
      onClick={addToUserRecipes}
    >
      <i className='fa fa-cloud-download'></i>
    </div>

  return (
    <li
      className='recipe'
    >
      <div
        className={
          addToUserAnime == recipe.id ?
          'addToUserAnime--hidden addToUserAnime--visible' :
          'addToUserAnime--hidden'
        }
      >
        <i className='fa fa-check fa-lg'></i>
        Added To My Recipes!
      </div>
      <div className='recipe__header'>
        {loggedIn && upperIcon}
        <h2 className='recipe__name'>
          {name}
        </h2>
        <ul className='tags'>
          {tagList}
        </ul>
      </div>
      <div className='recipe__control-bar'>
        <div
          onClick={loggedIn ?
            voteDialogue :
            loginDialogue
          }
        >
          {starIcons}
        </div>
        <div
          className='recipe__votes'
        >
          {totalVotes} Vote{totalVotes != 1 && 's'}
        </div>
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
      <div className='recipe__body'>
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
      <div className='recipe__credits recipe__credits--public'>
        <div className='recipe__credits__author'>
          <i className='recipe__credits__icon fa fa-id-card-o'></i>
          Recipe By: <span className='credit-name'>{author}</span>
        </div>
        <div className='recipe__credits__publisher'>
          <i className='recipe__credits__icon fa fa-newspaper-o'></i>
          Published By: <span className='credit-name'>{publisher}</span>
        </div>
      </div>
      }
    </li>
  )
}

export default PublicRecipe
