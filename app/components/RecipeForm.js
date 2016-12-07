const React = require('react');

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      content
    } = props.modal;

    const editRecipe = {};
    if (typeof content == 'object') {
      editRecipe.tags = content.tags.join(',');
      editRecipe.ingredients = content.ingredients.join(';\n');
      editRecipe.directions = content.directions.join(';\n\n');
      this.state = Object.assign(
        {},
        content,
        editRecipe
      );

    } else {
      this.state = {
        id: new Date().getTime(),
        name: '',
        tags: '',
        stars: 0,
        servings: 1,
        ingredients: '',
        directions: '',
        showDetails: false
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
      recipe.ingredients.split(';')
        .map(ingredient =>
          ingredient.trim())
        .filter(ingredient => ingredient !== '') : [];

    recipe.directions = recipe.directions ?
      recipe.directions.split(';')
        .map(direction =>
          direction.trim())
        .filter(direction => direction !== '') : [];

    const action = typeof this.props.modal.content == 'object' ?
          'EDIT_RECIPE' : 'ADD_RECIPE'

    this.props.updateStore({
      type: action,
      recipe
    });
    document.body.classList.remove('no-scroll');
    this.props.updateStore({type: 'CLOSE_MODAL'});
  }

  render() {
    const {
      modal,
      updateStore
    } = this.props;

    return (
      <form
        className='recipe-form'
        onClick={e =>
          e.stopPropagation()
        }
      >
        <h2 className="recipe-form__title">
          {typeof modal.content == 'object' ? 'Edit': 'New'} Recipe
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
          Ingredients (separated by semicolons):
        </label>
        <textarea
          rows='10'
          name='ingredients'
          value={this.state.ingredients}
          onChange={(e) => this.setState({ingredients: e.target.value})}
        />

        <label htmlFor='directions'>
          Directions (separated by semicolons):
        </label>
        <textarea
          rows='14'
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
          onClick={() => {
            document.body.classList.remove('no-scroll');
            updateStore({type: 'CLOSE_MODAL'});
          }}
        >
          <i className='fa fa-times'></i>
        </span>
      </form>
    );
  }
}

module.exports = RecipeForm;
