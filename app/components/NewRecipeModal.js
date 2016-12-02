let React = require('react');

class NewRecipeModal extends React.Component {
  save() {

  }

  render() {
    return (
      <div className='new-recipe-modal'>
        <form className='new-recipe-form'>
          <h2>New Recipe</h2>
          <label htmlFor='title'>Name:</label>
          <input type='text' name='title' />

          <label htmlFor='tags'>
            Tags (separated by commas):
          </label>
          <input
            type='text'
            name='tags'
          />

          <label htmlFor='servings'>
            Servings:
          </label>
          <input
            type='number'
            min="1"
            name='servings'
            className='new-recipe-form__servings'
          /><br />

          <label htmlFor='ingredients'>
            Ingredients (separated by commas):
          </label>
          <textarea
            rows='6'
            name='ingredients'
          />

          <label htmlFor='directions'>
            Directions (separated by semicolons):
          </label>
          <textarea
            rows='12'
            name='directions'
          />

          <span
            className='new-recipe-form__save'
            onClick={this.save}
          >
            <i className='fa fa-check'></i>
          </span>
          <span
            className='new-recipe-form__cancel'
            onClick={this.props.cancelRecipe}
          >
            <i className='fa fa-times'></i>
          </span>
        </form>
      </div>
    );
  }
}

module.exports = NewRecipeModal;
