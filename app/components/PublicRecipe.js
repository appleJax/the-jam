import React from 'react'
import encodeUrl from 'encodeurl'
import { timeFormatter } from '../utils/timeFormatter'
import RecipeBody from './RecipeBody'

const PublicRecipe = ({
  recipe,
  visibilityFilter,
  user,
  username,
  loggedIn,
  addToUserAnime,
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

  const formatStats = () => {
    const { hours, minutes, hasTime } = timeFormatter(time)
    let result = ''

    if (hasTime) {
      result += hours + minutes
    }

    if (calories > 0)
      result += `\n${calories} cals`

    if (servings > 0)
      result += `\n${servings} servings`

    if (result)
      result += "\n"

    return result
  }

  const emailLink = 'mailto:?subject=' +
    encodeUrl(`${name} Recipe -- theJam`) +
    '&body=' +
    encodeUrl(`RECIPE: ${name}

${ formatStats() }
INGREDIENTS:

${ingredients.map( item => '- ' + item).join("\n")}


DIRECTIONS:

${directions.map( (item, i) => `${i + 1}. ${item}`).join("\n\n")}

${ notes.length > 0 ? "\nNOTES:\n\n" + notes.join("\n") + "\n\n" : ''}
https://thejam.herokuapp.com
`)

  return (
    <li
      className='recipe'
    >
      <div
        className={
          addToUserAnime == id ?
            'addToUserAnime--hidden addToUserAnime--visible' :
            'addToUserAnime--hidden'
        }
      >
        <div className='addToUserAnime__content'>
          <i className='fa fa-check fa-lg'></i>
          Added To My Recipes!
        </div>
      </div>
      <div className='recipe__header'>
        {loggedIn && upperIcon}
        <h2 className='recipe__name'>
          {name}
        </h2>
        <a href={ emailLink } target='_blank' className='mail-recipe'>
          <i className='fa fa-envelope-o'></i>
        </a>
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
        <div
          onClick={toggleDetails}
        >
          <i
            className={
              showDetails ?
              'recipe__expand-toggle fa fa-toggle-up fa-lg' :
              'recipe__expand-toggle fa fa-ellipsis-h fa-lg'
            }
          >
          </i>
        </div>
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
