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
          value={filter}
          onChange={e => {
            const val = e.target.value.trim(),
                  filter = val;
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
              type: 'TOGGLE_MODAL'
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
