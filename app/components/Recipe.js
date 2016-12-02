require('font-awesome/scss/font-awesome.scss');
let React = require('react');

class Recipe extends React.Component {
  render() {
    let id = this.props.recipe.id;
    let tags = this.props.recipe.tags ?
                 this.props.recipe.tags.map(
                   (tag, i) => <li key={i}>{tag}</li>
                 ) :
                 '';

    let ingredients = this.props.recipe.ingredients ?
                        this.props.recipe.ingredients.map(
                          (ingredient, i) => <li key={i}>{ingredient}</li>
                        ) :
                        <li>None</li>;

    let directions = this.props.recipe.directions ?
                       this.props.recipe.directions.map(
                         (direction, i) => <li key={i}>{direction}</li>
                       ) :
                       <li>None</li>;

    let details = this.props.recipe.showDetails ?
      (
      <div>
        <div className="ingredients">
          <h3>Ingredients:</h3>
          <span className="servings">
          {this.props.recipe.servings} {this.props.recipe.servings ? 'servings' : ''}
          </span>
          <ul>
            {ingredients}
          </ul>
        </div>
        <div className="directions">
          <h3>Directions:</h3>
          <ol>
            {directions}
          </ol>
        </div>
        <span className="edit"><i className="fa fa-pencil"></i></span>
      </div>
      ) : '';

    return (
      <div className="recipe">
        <span className="delete"
              onClick={() =>
                this.props.handleClick({
                  type: 'DELETE_RECIPE',
                  id
                })
              }
        >
          <i className="fa fa-times"></i>
        </span>
        <h2 className="recipe-name">
          {this.props.recipe.name}
        </h2>
        <ul className="tags">
           {tags}
        </ul>
        <i
          onClick={() =>
            this.props.handleClick({
              type: 'TOGGLE_DETAILS',
              id
            })
          }
          id="expand-toggle"
          className={
            this.props.recipe.showDetails ?
            "fa fa-toggle-up" :
            "fa fa-ellipsis-h"
          }>
          </i>
        {details}
      </div>
    );
  }
}

module.exports = Recipe;
