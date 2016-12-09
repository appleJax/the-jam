import React from 'react'

const ConfirmDialogue = ({
  id,
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
      <span
        className='confirm-dialogue__delete'
        onClick={() => {
          deleteRecipe(id)
          closeModal()
        }}
      >
        Delete
      </span>
      <span
        className='confirm-dialogue__cancel'
        onClick={closeModal}
      >
        Cancel
      </span>
    </div>
  );
}

module.exports = ConfirmDialogue;
