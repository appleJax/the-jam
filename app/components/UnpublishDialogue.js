import React from 'react'

const UnpublishDialogue = ({
  unpublishRecipe,
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
      Unpublish Recipe?
    </h3>
      <p>The recipe will be removed from the public space, and it will lose all votes permanently.</p>
      <div
        className='confirm-dialogue__button confirm-dialogue__button--delete'
        onClick={() => {
          unpublishRecipe()
          closeModal()
        }}
      >
        Unpublish
      </div>
      <div
        className='confirm-dialogue__button confirm-dialogue__button--cancel'
        onClick={closeModal}
      >
        Cancel
      </div>
  </div>
)

export default UnpublishDialogue
