let React = require('react');

class RecipeModal extends React.Component {
  constructor(props) {
    super(props);
    let editRecipe = {};
    if (typeof props.editRecipe == 'object') {
      editRecipe.tags = props.editRecipe.tags.join(',');
      editRecipe.ingredients = props.editRecipe.ingredients.join(',');
      editRecipe.directions = props.editRecipe.directions.join(';');
      this.state = Object.assign(
        {},
        props.editRecipe,
        editRecipe
      );

    } else {
      this.state = {
        id: new Date().getTime(),
        name: '',
        tags: '',
        servings: 1,
        ingredients: '',
        directions: '',
      };
    }
  }

  save() {
    let recipe = this.state;
    recipe.name = recipe.name.trim() || 'New Recipe';
    recipe.tags = recipe.tags ?
      recipe.tags.split(',')
        .map(tag =>
          tag.toLowerCase()
             .trim())
        .filter(tag => tag !== '') : [];
    recipe.servings = recipe.servings || 1;
    recipe.ingredients = recipe.ingredients ?
      recipe.ingredients.split(',')
        .map(ingredient =>
          ingredient.trim())
        .filter(ingredient => ingredient !== '') : [];
    recipe.directions = recipe.directions ?
      recipe.directions.split(';')
        .map(direction =>
          direction.trim())
        .filter(direction => direction !== '') : [];
    let action = typeof this.props.editRecipe == 'object' ?
          'EDIT_RECIPE' : 'ADD_RECIPE'
    let newAction = {
      type: action,
      recipe: recipe
    };

    this.props.closeModal();
    this.props.saveRecipe(newAction);
  }

  render() {
    return (
      <div className='recipe-modal'>
        <form className='recipe-form'>
          <h2>
            {typeof this.props.editRecipe == 'object' ? 'Edit': 'New'} Recipe
          </h2>
          <label htmlFor='title'>Name:</label>
          <input
            type='text'
            name='title'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />

          <label htmlFor='tags'>
            Tags (separated by commas):
          </label>
          <input
            type='text'
            name='tags'
            value={this.state.tags}
            onChange={(e) => this.setState({tags: e.target.value})}
          />

          <label htmlFor='servings'>
            Servings:
          </label>
          <input
            type='number'
            name='servings'
            className='recipe-form__servings'
            value={this.state.servings}
            onChange={(e) => {
              let val = e.target.value;
              this.setState({servings: (val > 0 || val === '') ? val : 1});
            }}
          />
          <br />

          <label htmlFor='ingredients'>
            Ingredients (separated by commas):
          </label>
          <textarea
            rows='6'
            name='ingredients'
            value={this.state.ingredients}
            onChange={(e) => this.setState({ingredients: e.target.value})}
          />

          <label htmlFor='directions'>
            Directions (separated by semicolons):
          </label>
          <textarea
            rows='12'
            name='directions'
            value={this.state.directions}
            onChange={(e) => this.setState({directions: e.target.value})}
          />

          <span
            className='recipe-form__save'
            onClick={this.save.bind(this)}
          >
            <i className='fa fa-check'></i>
          </span>
          <span
            className='recipe-form__cancel'
            onClick={this.props.closeModal}
          >
            <i className='fa fa-times'></i>
          </span>
        </form>
      </div>
    );
  }
}

module.exports = RecipeModal;
