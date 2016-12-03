let React = require('react');

class RecipeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: new Date().getTime(),
      name: '',
      tags: '',
      servings: 1,
      ingredients: '',
      directions: '',
    };
  }

  save() {
    let recipe = this.state;
    recipe.name = recipe.name.trim();
    recipe.tags = recipe.tags ?
      recipe.tags.split(',')
        .map(tag =>
          tag.toLowerCase()
             .trim()) : [];
    recipe.servings = recipe.servings || 1;
    recipe.ingredients = recipe.ingredients ?
      recipe.ingredients.split(',')
        .map(ingredient =>
          ingredient.trim()) : [];
    recipe.directions = recipe.directions ?
      recipe.directions.split(';')
        .map(direction =>
          direction.trim()) : [];
    let newAction = Object.assign(
      {},
      recipe,
      {type: 'ADD_RECIPE'}
    );

    this.props.closeModal();
    this.props.saveRecipe(newAction);
  }

  render() {
    return (
      <div className='recipe-modal'>
        <form className='recipe-form'>
          <h2>New Recipe</h2>
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
