import React from 'react'

const Nav = ({
  visibilityFilter,
  setVisibilityFilter,
  populateModal
}) => {
  return (
    <nav>
      <i className='fa fa-search fa-lg'></i>
      <input
        type='search'
        id='search'
        value={visibilityFilter.join(' ')}
        onChange={ e => {
          const filter = e.target.value
            .split(' ')

          setVisibilityFilter(filter)
        }}
      />
      <span
        id='add-button'
        onClick={populateModal}
      >
        <i className='fa fa-plus'></i>
      </span>
    </nav>
  )
}

module.exports = Nav;
