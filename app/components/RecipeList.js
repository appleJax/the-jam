let React = require('react'),
    Recipe = require('./Recipe');

class RecipeList extends React.Component {
  render() {
    let recipes = this.props.recipes.map(
                    r => (
                      <li key={r.id}>
                        <Recipe
                          recipe={r}
                          handleClick={this.props.handleClick}
                          editRecipe={this.props.editRecipe}
                        />
                      </li>
                    )
                  );

    return (
      <ul className="recipe-list">
        {recipes}
      </ul>
    );
  }
}

module.exports = RecipeList;
