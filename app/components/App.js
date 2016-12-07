const React = require('react'),
    Nav = require('./Nav'),
    RecipeList = require('./RecipeList'),
    ModalOverlay = require('./ModalOverlay'),
    Footer = require('./Footer');

class App extends React.Component {
  render() {
    const {
      modal,
      recipes
    } = this.props;

    return (
      <div className="container">
        <Nav
          {...this.props}
        />
        <RecipeList
          {...this.props}
        />
        {
          modal.show ?
          <ModalOverlay
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
