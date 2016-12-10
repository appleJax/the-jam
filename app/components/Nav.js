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
        className='nav__searchbox'
        value={visibilityFilter.join(' ')}
        onChange={ e => {
          const filter = e.target.value
            .split(' ')

          setVisibilityFilter(filter)
        }}
      />
      <div
        className='nav__add-recipe'
        onClick={populateModal}
      >
        <i className='fa fa-plus fa-lg'></i>
      </div>
    </nav>
  )
}

module.exports = Nav;
