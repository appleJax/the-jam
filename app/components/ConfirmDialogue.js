const React = require('react');

class ConfirmDialogue extends React.Component {
  render() {
    const {
      updateStore
    } = this.props;

    const {
      id
    } = this.props.modal.content;

    return (
      <div
        className='confirm-dialogue'
        onClick={e =>
          e.stopPropagation()
        }
      >
        <h3
          className='confirm-dialogue__message'
        >
          Delete recipe permanently?
        </h3>
        <span
          className='confirm-dialogue__delete'
          onClick={() => {
            updateStore({
              type: 'DELETE_RECIPE',
              id
            });
            updateStore({
              type: 'CLOSE_MODAL'
            });
          }}
        >
          Delete
        </span>
        <span
          className='confirm-dialogue__cancel'
          onClick={() =>
            updateStore({
              type: 'CLOSE_MODAL'
            })
          }
        >
          Cancel
        </span>
      </div>
    );
  }
}

module.exports = ConfirmDialogue;
