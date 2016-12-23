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
      const newContent = content
      delete newContent._id
      tempRecipe.tags = content.tags.join(',')
      tempRecipe.ingredients = content.ingredients.join('\n')
      tempRecipe.directions = content.directions.join('\n\n')
      tempRecipe.notes = content.notes.join('\n')
      this.state = {
        ...newContent,
        ...tempRecipe,
      }

    } else {
      this.state = {
        id: Date.now(),
        name: '',
        tags: '',
        time: '',
        stars: 0,
        servings: 1,
        ingredients: '',
        directions: '',
        notes: '',
        author: '',
        showDetails: true
      }
    }
  }

  save() {
    let recipe = this.state;
    recipe.name = recipe.name.trim() || 'New Recipe'

    recipe.tags = recipe.tags ?
      recipe.tags.split(',')
        .map(tag =>
          tag.toLowerCase()
             .trim())
        .filter(tag => tag !== '') : []

    recipe.servings = recipe.servings || 1

    recipe.ingredients = recipe.ingredients.trim() ?
      recipe.ingredients.split('\n')
        .map(ingredient =>
          ingredient.trim())
        .filter(ingredient => ingredient !== '') : ['None']

    recipe.directions = recipe.directions.trim() ?
      recipe.directions.split('\n')
        .map(direction =>
          direction.trim())
        .filter(direction => direction !== '') : ['None']

    recipe.notes = recipe.notes.trim() ?
      recipe.notes.split('\n') : ''

    recipe.author = recipe.author.trim() || 'Me'

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
    } = this.props

    return (
      <div
        className='recipe-form--container'
        onClick={e =>
          e.stopPropagation()
        }
      >
        <div className="recipe-form__title">
          {typeof this.content == 'object' ? 'Edit': 'New'} Recipe
        </div>
        <form className='recipe-form'>
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

          <label htmlFor='time'>
            <i className='fa fa-clock-o'></i> Time Required:
          </label>
          <input
            type='text'
            name='time'
            value={this.state.time}
            onChange={(e) => this.setState({time: e.target.value})}
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

          <label htmlFor='notes'>
            Notes:
          </label>
          <textarea
            rows='14'
            name='notes'
            value={this.state.notes}
            onChange={(e) => this.setState({notes: e.target.value})}
          />

          <label htmlFor='author'>
            Author:<span className='parens'>(not your recipe? give credit here)</span>
          </label>
          <input
            type='text'
            name='time'
            value={this.state.author}
            onChange={(e) => this.setState({author: e.target.value})}
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
      </div>
    )
  }
}

export default RecipeForm
