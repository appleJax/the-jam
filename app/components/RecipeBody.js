import React from 'react'
import { timeFormatter } from '../utils/timeFormatter'

const RecipeBody = ({
  time,
  calories,
  servings,
  ingredientList,
  directionList,
  notes
}) => {
  const { hours, minutes, hasTime } = timeFormatter(time),
        timeDiv = hasTime ?
          <div className='recipe-body__stats-div'>
            <i className='recipe-body__stats-div__icon fa fa-clock-o'></i>
            {hours}
            {minutes}
          </div> : '',
        calDiv = calories > 0 ?
          <div className='recipe-body__stats-div'>
            {calories} cal{calories == 1 ? '' : 's'}
          </div>: ''

  return (
    <div>
      <div className='recipe-body__stats-bar'>
        {timeDiv}
        {calDiv}
      </div>
      <div className='recipe-body__ingredients'>
        <h3><i className='fa fa-shopping-basket'></i> Ingredients:</h3>
        <span className='recipe-body__servings'>
          {servings} {servings ? 'serving' : ''}
          {servings > 1 ? 's' : ''}
        </span>
        <ul>
          {ingredientList}
        </ul>
      </div>
      <div className='recipe-body__directions'>
        <h3><i className='fa fa-map-signs'></i> Directions:</h3>
        <ol>
          {directionList}
        </ol>
      </div>
      {notes.length > 0 &&
      <div>
        <h3 className='recipe-body__notes-title'>
          <i className='fa fa-pencil'></i> Notes:
        </h3>
        <div className='recipe-body__notes'>
          {notes.map(
            (line, i) =>
              <p key={i}>{line}</p>
           )
          }
        </div>
      </div>
      }
    </div>
  )
}

export default RecipeBody
