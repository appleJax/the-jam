const React = require('react'),
    Nav = require('./Nav'),
    RecipeList = require('./RecipeList'),
    RecipeModal = require('./RecipeModal'),
    Footer = require('./Footer');

class App extends React.Component {
  render() {
    function storageAvailable(type) {
      try {
        var storage = window[type],
          x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      }
      catch(e) {
        return false;
      }
    }

    const {
      modal,
      recipes
    } = this.props;

    if (storageAvailable('localStorage')) {
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }

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
