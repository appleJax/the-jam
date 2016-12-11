import React from 'react'

const ConfirmDialogue = ({
  deleteRecipe,
  closeModal
}) => {
  return (
    <div
      className='confirm-dialogue'
      onClick={ e =>
        e.stopPropagation()
      }
    >
      <h3
        className='confirm-dialogue__message'
      >
        Delete recipe permanently?
      </h3>
      <div
        className='confirm-dialogue__delete'
        onClick={() => {
          deleteRecipe()
          closeModal()
        }}
      >
        Delete
      </div>
      <div
        className='confirm-dialogue__cancel'
        onClick={closeModal}
      >
        Cancel
      </div>
    </div>
  );
}

module.exports = ConfirmDialogue;
