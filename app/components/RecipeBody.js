import React from 'react'

const RecipeBody = ({
  time,
  servings,
  ingredientList,
  directionList,
  notes
}) => (
  <div>
    {time &&
      <div className='recipe-body__time-div'>
        <i className='fa fa-clock-o'></i>
        <span className='recipe-body__time'>
          {time}
        </span>
      </div>
    }
    <div className='recipe-body__ingredients'>
      <h3>Ingredients:</h3>
      <span className='recipe-body__servings'>
        {servings} {servings ? 'serving' : ''}
        {servings > 1 ? 's' : ''}
      </span>
      <ul>
        {ingredientList}
      </ul>
    </div>
    <div className='recipe-body__directions'>
      <h3>Directions:</h3>
      <ol>
        {directionList}
      </ol>
    </div>
    {notes &&
    <div>
      <h3 className='recipe-body__notes-title'>
        Notes:
      </h3>
      <div className='recipe-body__notes'>
        {notes.map(
          line =>
            <p>{line}</p>
         )
        }
      </div>
    </div>
    }
  </div>
)

export default RecipeBody
