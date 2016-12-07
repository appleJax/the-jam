const React = require('react'),
      RecipeForm = require('./RecipeForm'),
      ConfirmDialogue = require('./ConfirmDialogue');

class ModalOverlay extends React.Component {
  render() {
    const {
      dialogue
    } = this.props.modal;

    const {
      updateStore
    } = this.props;

    const content = (dialogue == 'confirm') ?
      <ConfirmDialogue
        {...this.props}
      /> :
      <RecipeForm
        {...this.props}
      />;

    return (
      <div
        className='modal-overlay'
        onClick={() => {
          document.body.classList.remove('no-scroll');
          updateStore({type: 'CLOSE_MODAL'});
        }}
      >
        {content}
      </div>
    );
  }
}

module.exports = ModalOverlay;
