import React from 'react'

const ConfirmDialogue = ({
  deleteRecipe,
  closeModal
}) => (
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
      className='confirm-dialogue__button confirm-dialogue__button--delete'
      onClick={() => {
        deleteRecipe()
        closeModal()
      }}
    >
      Delete
    </div>
    <div
      className='confirm-dialogue__button confirm-dialogue__button--cancel'
      onClick={closeModal}
    >
      Cancel
    </div>
  </div>
)

export default ConfirmDialogue
