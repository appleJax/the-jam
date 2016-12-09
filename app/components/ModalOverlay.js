import React from 'react'
import ConfirmDialogue from '../components/ConfirmDialogue'
import RecipeForm from '../components/RecipeForm'

const ModalOverlay = ({
  dialogue,
  content,
  editRecipe,
  deleteRecipe,
  closeModal
}) => {
  const  dialogueBox = dialogue == 'confirm' ?
      <ConfirmDialogue
        id={content.id}
        deleteRecipe={() => deleteRecipe(id)}
        closeModal={closeModal}
      /> :
      <RecipeForm
        content={content}
        addRecipe={addRecipe}
        editRecipe={editRecipe}
        deleteRecipe={deleteRecipe}
        closeModal={closeModal}
      />
  }

  return (
    <div
      className='modal-overlay'
      onClick={props.closeModal}
      }}
    >
      {dialogueBox}
    </div>
  )
}

module.exports = ModalOverlay;
