import React from 'react'
import ConfirmDialogue from '../components/ConfirmDialogue'
import RecipeForm from '../components/RecipeForm'

const ModalOverlay = ({
  dialogue,
  content,
  addRecipe,
  editRecipe,
  deleteRecipe,
  closeModal
}) => {
  const  dialogueBox = dialogue == 'confirm' ?
      <ConfirmDialogue
        deleteRecipe={() => deleteRecipe(null, {id: content})}
        closeModal={closeModal}
      /> :
      <RecipeForm
        content={content}
        addRecipe={addRecipe}
        editRecipe={editRecipe}
        deleteRecipe={deleteRecipe}
        closeModal={closeModal}
      />

  return (
    <div
      className='modal-overlay'
      onClick={closeModal}
    >
      {dialogueBox}
    </div>
  )
}

module.exports = ModalOverlay;
