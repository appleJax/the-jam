import React from 'react'

const RecipeBody = ({
  servings,
  ingredientList,
  directionList
}) => (
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
  </div>
)

export default RecipeBody
