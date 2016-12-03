require('font-awesome/scss/font-awesome.scss');
let React = require('react');

class Nav extends React.Component {
  render() {
    const {
      newRecipe
    } = this.props;
    
    return (
      <nav>
        <i className="fa fa-search fa-lg"></i>
        <input type="search" id="search" />
        <span
          id="add-button"
          onClick={() => {
            document.body.classList.add('no-scroll');
            newRecipe();
          }}
        >
          <i className="fa fa-plus"></i>
        </span>
      </nav>
    );
  }
}

module.exports = Nav;
