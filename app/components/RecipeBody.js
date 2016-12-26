import React from 'react'

const RecipeBody = ({
  time,
  calories,
  servings,
  ingredientList,
  directionList,
  notes
}) => {
  const hours = time.hours,
        minutes = time.minutes,
        hasTime = (time.hours != 0 && time.minutes != 0),
        printHours = hours > 0 ?
          (hours == 1 ? hours + ' hr ' : hours + ' hrs ') : '',
        printMinutes = minutes > 0 ?
          (minutes == 1 ? minutes + ' min ' : minutes + ' mins ') : '',
        timeDiv = hasTime ?
          <div className='recipe-body__time-div'>
            <i className='fa fa-clock-o'></i>
            <span className='recipe-body__time'>
              {printHours}
              {printMinutes}
            </span>
          </div> : '',
        calDiv = calories > 0 ?
          <div className='recipe-body__calories-div'>
            {calories} cal{calories == 1 ? '' : 's'}
          </div>: ''

  return (
    <div>
      {timeDiv}
      {calDiv}
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
