import React from 'react'

class PublishDialogue extends React.Component {
  constructor(props) {
    super(props)
    this.recipe = props.recipe
    this.user = props.user
    this.username = props.username
    this.publishRecipe = props.publishRecipe
    this.closeModal = props.closeModal

    this.save = this.save.bind(this)

    this.state = {
      author: ''
    }
  }

  save() {
    const newRecipe = this.recipe
    newRecipe.author = this.state.author.trim()
    newRecipe.publisher = this.username

    this.publishRecipe(this.user, newRecipe)
    this.closeModal()
  }

  render() {
  (
  <div
    className='confirm-dialogue'
    onClick={ e =>
      e.stopPropagation()
    }
  >
    <h3
      className='confirm-dialogue__message'
    >
      Publish Recipe
    </h3>
      <p
       className='confirm-dialogue__description'
      >
        Not an original recipe? Give the chef some credit...
      </p>
      <label
        className='publish-dialogue__author-name'
        htmlFor='author'
      >
        Original Author:
      </label>
      <input
        type='text'
        name='author'
        className='publish-dialogue__author-input'
        value={this.state.author}
        onChange={ e =>
          this.setState({author: e.target.value})
        }
      />

      <div
        className='confirm-dialogue__button confirm-dialogue__button--accept'
        onClick={this.save}
      >
        Publish
      </div>
      <div
        className='confirm-dialogue__button confirm-dialogue__button--cancel'
        onClick={closeModal}
      >
        Cancel
      </div>
  </div>
  )}
}

export default PublishDialogue
