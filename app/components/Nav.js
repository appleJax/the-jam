import React from 'react'

const Nav = ({
  visibilityFilter,
  sort,
  loggedIn,
  name,
  setFilterContent,
  setFilterRecipes,
  setSort,
  populateModal,
  login,
  logout
}) => (
  <nav>
    <div className='nav__header'>
      <h2 className='logo'>
        the Jam
      </h2>
      <div className='nav__user'>
      {loggedIn &&
        <div
          className='user-info'
          onClick={logout}
        >
          <i className='fa fa-user fa-2x'></i>
          <span className='username'>
            {name}
          </span>
        </div>
      }
      {!loggedIn &&
        <div
          className='signin'
          onClick={login}
        >
          Sign In
        </div>
      }
      </div>
    </div>
    <div className='nav__search'>
      <i className='fa fa-search fa-2x'></i>
      <input
        type='search'
        className='nav__searchbox'
        value={visibilityFilter.content.join(' ')}
        onChange={ e => {
          const filter = e.target.value
            .split(' ')

          setFilterContent(filter)
        }}
      />
    </div>
    {loggedIn &&
    <div className='nav__recipe-list-selector'>
      <div
        className={visibilityFilter.active == 'public' ?
          'nav__recipe-selector--active nav__recipe-selector' :
          'nav__recipe-selector'
        }
        onClick={() => setFilterRecipes('public')}
      >
        Public Recipes
      </div>
      <div
        className={visibilityFilter.active == 'private' ?
          'nav__recipe-selector--active nav__recipe-selector' :
          'nav__recipe-selector'
        }
        onClick={() => setFilterRecipes('private')}
      >
        My Recipes
      </div>
    </div>
    }
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
      {visibilityFilter.active == 'private' &&
      <div
        className='nav__add-recipe'
        onClick={populateModal}
      >
        <i className='fa fa-plus fa-lg'></i>
      </div>
      }
    </div>
  </nav>
)

export default Nav
