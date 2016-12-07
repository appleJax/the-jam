require('font-awesome/scss/font-awesome.scss');
const React = require('react');

class Nav extends React.Component {
  render() {
    const {
      filter,
      updateStore
    } = this.props;

    return (
      <nav>
        <i className='fa fa-search fa-lg'></i>
        <input
          type='search'
          id='search'
          value={filter.join(' ')}
          onChange={e => {
            const filter = e.target.value.split(' ');

            updateStore({
              type: 'SET_FILTER',
              filter
            });
          }}
        />
        <span
          id='add-button'
          onClick={() => {
            document.body.classList.add('no-scroll');
            updateStore({
              type: 'POPULATE_MODAL',
              dialogue: 'recipe',
              content: 'new'
            });
          }}
        >
          <i className='fa fa-plus'></i>
        </span>
      </nav>
    );
  }
}

module.exports = Nav;
