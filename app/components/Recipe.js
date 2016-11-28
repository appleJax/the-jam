require('font-awesome/scss/font-awesome.scss');
let React = require('react');

class Recipe extends React.Component {
  render() {
    let tags = this.props.recipe.tags.map(
                 (tag, i) => <li key={i}>{tag}</li>
    );
    let ingredients = this.props.recipe.ingredients.map(
                        (ingredient, i) => <li key={i}>{ingredient}</li>
    );

    return (
      <div className="recipe">
        <h2 className="recipe-name">{this.props.recipe.name}</h2>
        <ul className="tags">
           {tags}
        </ul>
        <div className="ingredients">
          <h3>Ingredients:</h3>
          <span className="servings">{this.props.recipe.servings} servings</span>
          <ul>
            {ingredients}
          </ul>
        </div>
        <h3>Directions:</h3>
        {this.props.recipe.directions}
        <span className="edit"><i className="fa fa-pencil"></i></span>
      </div>
    );
  }
}

module.exports = Recipe;
