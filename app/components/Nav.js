import React from 'react'

const Nav = ({
  visibilityFilter,
  sort,
  setVisibilityFilter,
  setSort,
  populateModal,
  login
}) => {
  return (
    <nav>
      <div className='nav__header'>
        <h2 className='logo'>
          the Jam
        </h2>
        <div className='nav__user'>
          <div
            className='signin'
            onClick={login}
          >
            Sign In
          </div>
        </div>
      </div>
      <div className='nav__search'>
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
      </div>
      <div className='nav__controls'>
        <div className='nav__sort-buttons'>
          <i
            onClick={() => setSort('ASC')}
            className={sort.asc ?
              'active sort fa fa-sort-alpha-asc fa-lg' :
              'sort fa fa-sort-alpha-asc fa-lg'
            }
          ></i>
          <i
            onClick={() => setSort('DESC')}
            className={sort.desc ?
              'active sort fa fa-sort-alpha-desc fa-lg' :
              'sort fa fa-sort-alpha-desc fa-lg'
            }
            ></i>
          <i
            onClick={() => setSort('STARS')}
            className={sort.stars ?
              'active sort fa fa-star fa-lg' :
              'sort fa fa-star fa-lg'
            }
            ></i>
        </div>
        <div
          className='nav__add-recipe'
          onClick={populateModal}
        >
          <i className='fa fa-plus fa-lg'></i>
        </div>
      </div>
    </nav>
  )
}

module.exports = Nav;
