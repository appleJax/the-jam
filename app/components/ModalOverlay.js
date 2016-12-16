import React from 'react'
import ConfirmDialogue from '../components/ConfirmDialogue'
import RecipeForm from '../components/RecipeForm'

const ModalOverlay = ({
  dialogue,
  content,
  active,
  user,
  addRecipe,
  editRecipe,
  deleteRecipe,
  closeModal
}) => {
  const  dialogueBox = dialogue == 'confirm' ?
      <ConfirmDialogue
        deleteRecipe={() => deleteRecipe(user, {id: content}, active)}
        closeModal={closeModal}
      /> :
      <RecipeForm
        content={content}
        active={active}
        addRecipe={addRecipe}
        editRecipe={editRecipe}
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
