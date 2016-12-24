import React from 'react'

class VoteDialogue extends React.Component {
  constructor(props) {
    super(props)
    const {
      username,
      recipe
    } = this.props

    const stars = recipe.votes[username] || 0

    this.state = {
      stars
    }
  }

  render() {
    const {
      user,
      username,
      recipe,
      voteForRecipe,
      closeModal
    } = this.props

    const starIcons = []

    for (let i = 1; i <= 5; i++) {
      if (i <= this.state.stars) {
        starIcons.push(
          <i className='fa fa-star fa-2x'
            key={i}
            data-value={i}
            onClick={ e => {
              let stars = Number(e.target.dataset.value)

              if (stars == 1) {
                stars = 0
              }

              this.setState({stars})
            }}
          >
          </i>
        )
      } else {
        starIcons.push(
          <i className='fa fa-star-o fa-2x'
            key={i}
            data-value={i}
            onClick={ e => {
              let stars = Number(e.target.dataset.value)
              this.setState({stars})
            }}
          >
          </i>
        )
      }
    }

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
        Your Vote
      </h3>
      <div className='confirm-dialogue__stars'>
        {starIcons}
      </div>
      <div className='confirm-dialogue__button-bar'>
        <div
          className='confirm-dialogue__button confirm-dialogue__button--cancel'
          onClick={closeModal}
        >
          Cancel
        </div>
        <div
          className='confirm-dialogue__button confirm-dialogue__button--accept'
          onClick={() => {
            voteForRecipe(username, this.state.stars, recipe, user)
            closeModal()
          }}
        >
          Vote
        </div>
      </div>
    </div>
  )}
}

export default VoteDialogue
