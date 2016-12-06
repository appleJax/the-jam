require('font-awesome/scss/font-awesome.scss');
const React = require('react');

class Recipe extends React.Component {
  render() {
    let {
      id,
      name,
      tags,
      stars,
      servings,
      ingredients,
      directions,
      showDetails
    } = this.props.recipe;

    const {
      filter,
      recipe,
      handleClick,
    } = this.props;

    tags = tags.map(
             (tag, i) =>
               <li
                 key={i}
                 onClick={e =>
                   handleClick({
                     type: 'SET_FILTER',
                     filter: filter.concat(e.target.innerHTML)
                   })
                 }
               >
                 {tag}
               </li>
           );

    ingredients = ingredients.map(
                    (ingredient, i) =>
                      <li key={i}>{ingredient}</li>
                  );

    directions = directions.map(
                   (direction, i) =>
                     <li key={i}>{direction}</li>
                 );

    const details = showDetails ?
      (
      <div>
        <div className='ingredients'>
          <h3>Ingredients:</h3>
          <span className='servings'>
          {servings} {servings ? 'serving' : ''}
          {servings > 1 ? 's' : ''}
          </span>
          <ul>
            {ingredients}
          </ul>
        </div>
        <div className='directions'>
          <h3>Directions:</h3>
          <ol>
            {directions}
          </ol>
        </div>
        <span
          className='edit'
          onClick={() => {
            document.body.classList.add('no-scroll');
            handleClick({
              type: 'POPULATE_MODAL',
              recipe
            });
          }}
        >
          <i className='fa fa-pencil'></i>
        </span>
      </div>
      ) : '';

      const starIcons = [];

      for (let i = 1; i <= 5; i++) {
        if (i <= stars) {
          starIcons.unshift(
            <i className='fa fa-star fa-lg'
               key={i}
               data-value={i}
               onClick={(e) => {
                 const editedRecipe = recipe,
                       newStars = e.target.dataset.value;
                 if (newStars == 1) {
                   editedRecipe.stars = 0;
                 } else {
                   editedRecipe.stars = newStars;
                 }
                 handleClick({
                   type: 'EDIT_RECIPE',
                   recipe: editedRecipe
                 });
               }}
            >
            </i>
          );
        } else {
          starIcons.unshift(
            <i className='fa fa-star-o fa-lg'
               key={i}
               data-value={i}
               onClick={(e) => {
                 const editedRecipe = recipe;
                 editedRecipe.stars = e.target.dataset.value;
                 handleClick({
                   type: 'EDIT_RECIPE',
                   recipe: editedRecipe
                 });
               }}
            >
            </i>
          );
        }
      }

    return (
      <div className='recipe'>
        <div className='recipe__header'>
          <span
            className='delete'
            onClick={() =>
              handleClick({
                type: 'DELETE_RECIPE',
                id
              })
            }
          >
            <i className='fa fa-times'></i>
          </span>
          <h2 className='recipe__name'>
            {name}
          </h2>
          <ul className='tags'>
             {tags}
          </ul>
        </div>
        <i
          onClick={() =>
            handleClick({
              type: 'TOGGLE_DETAILS',
              id
            })
          }
          id='expand-toggle'
          className={
            showDetails ?
            'fa fa-toggle-up' :
            'fa fa-ellipsis-h'
          }
        >
        </i>
        {starIcons}
        {details}
      </div>
    );
  }
}

module.exports = Recipe;
