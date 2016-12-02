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
