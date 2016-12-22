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
  loginDialogue
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
  console.log('loggedIn:',loggedIn)
  const voteAction = loggedIn == true ? voteDialogue : loginDialogue
  console.log('action:', voteAction)
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

  let totalStars = 0

  for (let voter in votes) totalStars += votes[voter]

  const totalVotes = Object.keys(votes).length,
        rating = Math.ceil(totalStars / totalVotes),
        starIcons = []

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
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

  const upperIcon = username == author ?
    <div
      className='recipe__button--mine-unpub'
      onClick={unpublishConfirm}
    >
      <i className='fa fa-id-card'></i>
    </div> :
    <div
      className='recipe__button--add-to-my-recipes'
      onClick={addToUserRecipes}
    >
      <i className='fa fa-cloud-download'></i>
    </div>

  return (
    <li
      className='recipe'>
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
          {totalVotes} Vote{totalVotes != 1 && 's'}
        </div>
        <div
          onClick={voteAction}
        >
          {starIcons}
        </div>
      </div>
      {showDetails &&
      <div>
        <RecipeBody
          servings={servings}
          ingredientList={ingredientList}
          directionList={directionList}
        />
        <div className='recipe__author'>
          <i className='fa fa-id-card-o'></i>
          Recipe By: <span className='author-name'>{author}</span>
        </div>
      </div>
      }
    </li>
  )
}

export default PublicRecipe
