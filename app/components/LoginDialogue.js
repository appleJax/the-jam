import React from 'react'

const LoginDialogue = ({
  login,
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
      Sign In to Vote
    </h3>
      <div
        className='confirm-dialogue__button confirm-dialogue__button--accept'
        onClick={login}
      >
        Sign In
      </div>
      <div
        className='confirm-dialogue__button confirm-dialogue__button--cancel'
        onClick={closeModal}
      >
        Cancel
      </div>
  </div>
)

export default LoginDialogue
