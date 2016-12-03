let React = require('react'),
    Recipe = require('./Recipe');

class RecipeList extends React.Component {
  render() {
    const {
      recipes,
      handleClick,
      editRecipe
    } = this.props;
    let recipeList = recipes.map(
                      r => (
                        <li key={r.id}>
                          <Recipe
                            recipe={r}
                            handleClick={handleClick}
                            editRecipe={editRecipe}
                          />
                        </li>
                      )
                    );

    return (
      <ul className="recipe-list">
        {recipeList}
      </ul>
    );
  }
}

module.exports = RecipeList;
