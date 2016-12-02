require('font-awesome/scss/font-awesome.scss');
let React = require('react');

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <input type="search" id="search" />
        <i className="fa fa-search fa-lg"></i>
        <span
          id="add-button"
          onClick={this.props.newRecipe}
        >
          <i className="fa fa-plus"></i>
        </span>
      </nav>
    );
  }
}

module.exports = Nav;
