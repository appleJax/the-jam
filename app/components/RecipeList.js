const React = require('react'),
    Recipe = require('./Recipe');

class RecipeList extends React.Component {
  render() {
    const {
      recipes,
      filter,
      updateStore,
      editRecipe
    } = this.props;

    const visibleRecipes = recipes.filter(
            recipe => {
              const text = recipe.name +
                recipe.tags.join(' ') +
                recipe.servings +
                recipe.ingredients.join(' ') +
                recipe.directions.join(' ');

              return text.match(filter);
            }
          );

    const recipeList = visibleRecipes.map(
                      r => (
                        <li key={r.id}>
                          <Recipe
                            recipe={r}
                            handleClick={updateStore}
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
