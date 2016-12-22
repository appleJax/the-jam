import React from 'react'
import ConfirmDialogue from '../components/ConfirmDialogue'
import RecipeForm from '../components/RecipeForm'
import VoteDialogue from '../components/VoteDialogue'
import LoginDialogue from '../components/LoginDialogue'

const ModalOverlay = ({
  dialogue,
  content,
  active,
  user,
  addRecipe,
  editRecipe,
  deleteRecipe,
  closeModal,
  voteForRecipe,
  login
}) => {
  let dialogueBox = ''

  switch (dialogue) {
    case 'confirm':
      dialogueBox = <ConfirmDialogue
        deleteRecipe={() => deleteRecipe(user, {id: content}, active)}
        closeModal={closeModal}
      />
      break
    case 'recipe':
      dialogueBox = <RecipeForm
        content={content}
        active={active}
        user={user}
        addRecipe={addRecipe}
        editRecipe={editRecipe}
        closeModal={closeModal}
      />
      break
    case 'vote':
      dialogueBox = <VoteDialogue
        user={user}
        recipe={content}
        voteForRecipe={voteForRecipe}
        closeModal={closeModal}
      />
      break
    case 'login':
      dialogueBox = <LoginDialogue
        login={login}
        closeModal={closeModal}
      />
  }

  return (
    <div
      className='modal-overlay'
      onClick={closeModal}
    >
      {dialogueBox}
    </div>
  )
}

export default ModalOverlay
