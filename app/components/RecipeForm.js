import React from 'react'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      content
    } = props
    this.content = props.content
    this.addRecipe = props.addRecipe
    this.editRecipe = props.editRecipe
    this.closeModal = props.closeModal

    const tempRecipe = {};
    if (typeof content == 'object') {
      tempRecipe.tags = content.tags.join(',')
      tempRecipe.ingredients = content.ingredients.join(';\n')
      tempRecipe.directions = content.directions.join(';\n\n')
      this.state = Object.assign(
        {},
        content,
        tempRecipe
      )

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

    if (typeof this.content == 'object') {
      this.editRecipe(recipe)
    } else {
      this.addRecipe(recipe)
    }

    this.closeModal()
  }

  render() {
    const {
      closeModal
    } = this.props;

    return (
      <form
        className='recipe-form'
        onClick={e =>
          e.stopPropagation()
        }
      >
        <h2 className="recipe-form__title">
          {typeof content == 'object' ? 'Edit': 'New'} Recipe
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
          onClick={closeModal}
        >
          <i className='fa fa-times'></i>
        </span>
      </form>
    );
  }
}

module.exports = RecipeForm;
