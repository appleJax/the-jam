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
      tempRecipe.notes = content.notes.join('\n\n')
      this.state = {
        ...newContent,
        ...tempRecipe,
      }

    } else {
      this.state = {
        id: Date.now(),
        name: '',
        tags: '',
        time: {
          hours: 0,
          minutes: 0
        },
        calories: 0,
        stars: 0,
        servings: 1,
        ingredients: '',
        directions: '',
        notes: '',
        author: '',
        published: false,
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
      recipe.notes.split('\n')
        .map(line =>
          line.trim())
        .filter(line => line !== '') : []

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

    const starIcons = []

    for (let i = 1; i <= 5; i++) {
      if (i <= this.state.stars) {
        starIcons.push(
          <i className='fa fa-star fa-lg'
            key={i}
            data-value={i}
            onClick={(e) => {
              let val = Number(e.target.dataset.value)

              if (val == 1) {
                val = 0

              }

              this.setState({stars: val})
            }}
          >
          </i>
        )
      } else {
        starIcons.push(
          <i className='fa fa-star-o fa-lg'
            key={i}
            data-value={i}
            onClick={(e) =>
              this.setState({stars: Number(e.target.dataset.value)})
            }
          >
          </i>
        )
      }
    }

    return (
      <div
        className='recipe-form--container'
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="recipe-form__title">
          {typeof this.content == 'object' ? 'Edit': 'New'} Recipe
        </div>
        <form className='recipe-form'>
          <label
            htmlFor='title'
            className='recipe-form__label'
          >
            <i className='fa fa-file-text-o'></i> Name:
          </label>
          <input
            type='text'
            name='title'
            className='recipe-form__input'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />

          <label
            htmlFor='tags'
            className='recipe-form__label'
          >
            <i className='fa fa-tags'></i> Tags:
            <span
              className='recipe-form__label recipe-form__label--parens'
            >
              (separated by commas)
            </span>
          </label>
          <input
            type='text'
            name='tags'
            className='recipe-form__input'
            value={this.state.tags}
            onChange={(e) => this.setState({tags: e.target.value})}
          />

          <label
            className='recipe-form__label'
          >
            <i className='fa fa-clock-o'></i> Time Required:
          </label>
          <div className='recipe-form__time-bar'>
            <div className='recipe-form__time-div'>
              <label
                htmlFor='hours'
                className='recipe-form__label recipe-form__label--sub'
              >
                Hours:
              </label>
              <input
                type='number'
                name='hours'
                className='recipe-form__input recipe-form__input--number recipe-form__input--hours'
                min='0'
                value={this.state.time.hours}
                onChange={(e) => {
                  // Disable decimals
                  console.log(e.which)
                  if (e.which == 190) {
                    e.preventDefault()
                    return
                  }

                  this.setState(
                    {time: {
                      ...this.state.time,
                      hours: e.target.value
                    }})
                }}
              />
            </div>
            <div className='recipe-form__time-div'>
              <label
                htmlFor='minutes'
                className='recipe-form__label recipe-form__label--sub'
              >
                Minutes:
              </label>
              <input
                type='number'
                name='minutes'
                className='recipe-form__input recipe-form__input--number recipe-form__input--minutes'
                max='60'
                min='0'
                value={this.state.time.minutes}
                onChange={(e) =>
                  this.setState(
                    {time: {
                      ...this.state.time,
                      minutes: e.target.value
                    }}
                  )}
              />
            </div>
          </div>

          <label
            htmlFor='calories'
            className='recipe-form__label recipe-form__label--number'
          >
            Calories:<br />
            <span
              className='recipe-form__label recipe-form__label--parens'
            >
              (per serving)
            </span>
          </label>
          <input
            type='number'
            name='calories'
            min='0'
            className='recipe-form__input recipe-form__input--number recipe-form__input--calories'
            value={this.state.calories}
            onChange={(e) => this.setState({calories: e.target.value})}
          />

          <div className='recipe-form__servings-group'>
            <label
              htmlFor='servings'
              className='recipe-form__label recipe-form__label--number'
            >
              Servings:
            </label>
            <input
              type='number'
              name='servings'
              max='999'
              min='1'
              className='recipe-form__input recipe-form__input--number'
              value={this.state.servings}
              onChange={(e) => {
                let val = e.target.value;
                this.setState({servings: (val > 0 || val === '') ? val : 1});
              }}
            />
          </div>

          <label
            htmlFor='ingredients'
            className='recipe-form__label'
          >
            <i className='fa fa-shopping-basket'></i> Ingredients:
            <span
              className='recipe-form__label recipe-form__label--parens'
            >
              (one per line)
            </span>
          </label>
          <textarea
            rows='10'
            name='ingredients'
            className='recipe-form__input'
            value={this.state.ingredients}
            onChange={(e) => this.setState({ingredients: e.target.value})}
          />

          <label
            htmlFor='directions'
            className='recipe-form__label'
          >
            <i className='fa fa-map-signs'></i> Directions:
            <span
              className='recipe-form__label recipe-form__label--parens'
            >
              (Separated by blank lines)
            </span>
          </label>
          <textarea
            rows='14'
            name='directions'
            className='recipe-form__input'
            value={this.state.directions}
            onChange={(e) => this.setState({directions: e.target.value})}
          />

          <label
            htmlFor='notes'
            className='recipe-form__label'
          >
            <i className='fa fa-pencil'></i> Notes:
          </label>
          <textarea
            rows='14'
            name='notes'
            value={this.state.notes}
            className='recipe-form__input'
            onChange={(e) => this.setState({notes: e.target.value})}
          />

          <div
            className='recipe-form__stars'
          >
            <label
              htmlFor='stars'
              className='recipe-form__label recipe-form__label--number'
            >
              Stars:
            </label>
              {starIcons}
          </div>

          <label
            htmlFor='author'
            className='recipe-form__label'
          >
            <i className='fa fa-magic'></i> Author:
            <span
              className='recipe-form__label recipe-form__label--parens'
            >
              (not your recipe? give credit here)
            </span>
          </label>
          <input
            type='text'
            name='time'
            value={this.state.author}
            className='recipe-form__input'
            onChange={(e) => this.setState({author: e.target.value})}
          />

          <div className='recipe-form__buttons'>
            <div
              className='recipe-form__cancel'
              onClick={closeModal}
            >
              <i className='button-icon fa fa-times fa-lg'></i>
              Cancel
            </div>
            <div
              className='recipe-form__save'
              onClick={this.save}
            >
              <i className='button-icon fa fa-check fa-lg'></i>
              Save
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default RecipeForm
