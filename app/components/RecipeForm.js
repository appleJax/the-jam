import React from 'react'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props)
    const {
      content
    } = props
    this.active = props.active
    this.content = props.content
    this.addRecipe = props.addRecipe
    this.editRecipe = props.editRecipe
    this.closeModal = props.closeModal
    this.save = this.save.bind(this)
    this.user = props.user

    const tempRecipe = {}

    if (typeof content == 'object') {
      const altContent = content
      delete altContent._id
      tempRecipe.tags = content.tags.join(',')
      tempRecipe.ingredients = content.ingredients.join('\n')
      tempRecipe.directions = content.directions.join('\n\n')
      this.state = {
        ...altContent,
        ...tempRecipe,
      }

    } else {
      this.state = {
        id: Date.now(),
        name: '',
        tags: '',
        stars: 0,
        servings: 1,
        ingredients: '',
        directions: '',
        showDetails: true
      }
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
      recipe.ingredients.split('\n')
        .map(ingredient =>
          ingredient.trim())
        .filter(ingredient => ingredient !== '') : [];

    recipe.directions = recipe.directions ?
      recipe.directions.split('\n')
        .map(direction =>
          direction.trim())
        .filter(direction => direction !== '') : [];

    if (typeof this.content == 'object') {
      this.editRecipe(this.user, recipe, this.active)
    } else {
      this.addRecipe(this.user, recipe, this.active)
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
          {typeof this.content == 'object' ? 'Edit': 'New'} Recipe
        </h2>
        <label htmlFor='title'>Name:</label>
        <input
          type='text'
          name='title'
          value={this.state.name}
          onChange={(e) => this.setState({name: e.target.value})}
        />

        <label htmlFor='tags'>
          Tags:<span className='parens'>(separated by commas)</span>
        </label>
        <input
          type='text'
          name='tags'
          value={this.state.tags}
          onChange={(e) => this.setState({tags: e.target.value})}
        />

        <div className='recipe-form__servings-group'>
          <label className='recipe-form__servings-label' htmlFor='servings'>
            Servings:
          </label>
          <input
            type='number'
            name='servings'
            max='999'
            min='1'
            className='recipe-form__servings-input'
            value={this.state.servings}
            onChange={(e) => {
              let val = e.target.value;
              this.setState({servings: (val > 0 || val === '') ? val : 1});
            }}
          />
        </div>

        <label htmlFor='ingredients'>
          Ingredients:<span className='parens'>(one per line)</span>
        </label>
        <textarea
          rows='10'
          name='ingredients'
          value={this.state.ingredients}
          onChange={(e) => this.setState({ingredients: e.target.value})}
        />

        <label htmlFor='directions'>
          Directions:<span className='parens'>(Separated by blank lines)</span>
        </label>
        <textarea
          rows='14'
          name='directions'
          value={this.state.directions}
          onChange={(e) => this.setState({directions: e.target.value})}
        />

        <div className='recipe-form__buttons'>
          <div
            className='recipe-form__save'
            onClick={this.save}
          >
            <i className='fa fa-check fa-lg'></i>
          </div>
          <div
            className='recipe-form__cancel'
            onClick={closeModal}
          >
            <i className='fa fa-times fa-lg'></i>
          </div>
        </div>
      </form>
    )
  }
}

export default RecipeForm
