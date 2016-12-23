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
      <div className='recipe-body__time'>
        <i className='fa fa-clock-o'></i> {time}
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
    <div className='recipe-body__notes'>
      <h3>Notes:</h3>
      {notes}
    </div>
    }
  </div>
)

export default RecipeBody
