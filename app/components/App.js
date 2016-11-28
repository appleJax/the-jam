let React = require('react'),
    Nav = require('./Nav'),
    RecipeList = require('./RecipeList'),
    Footer = require('./Footer');

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav
          handleClick={this.props.updateStore}
        />
        <div className="container">
          <RecipeList
            recipes={this.props.state}
          />
          <Footer />
        </div>
      </div>
    );
  }
}

module.exports = App;
