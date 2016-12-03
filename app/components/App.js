const React = require('react'),
    Nav = require('./Nav'),
    RecipeList = require('./RecipeList'),
    RecipeModal = require('./RecipeModal'),
    Footer = require('./Footer');

class App extends React.Component {
  render() {
    const { modal } = this.props;
    
    return (
      <div className="container">
        <Nav
          {...this.props}
        />
        <RecipeList
          {...this.props}
        />
        {
          modal ?
          <RecipeModal
            {...this.props}
          /> : ''
        }
        <div className="spacer"></div>
        <Footer />
      </div>
    );
  }
}

module.exports = App;
