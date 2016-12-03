let React = require('react'),
    Nav = require('./Nav'),
    RecipeList = require('./RecipeList'),
    RecipeModal = require('./RecipeModal'),
    Footer = require('./Footer');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  populateModal(recipe) {
    this.setState({showModal: recipe});
  }

  render() {
    return (
      <div className="container">
        <Nav
          newRecipe={this.toggleModal.bind(this)}
          updateStore={this.props.updateStore}
        />
        <RecipeList
          handleClick={this.props.updateStore}
          recipes={this.props.state}
          editRecipe={this.populateModal.bind(this)}
        />
        {
          this.state.showModal ?
          <RecipeModal
            saveRecipe={this.props.updateStore}
            closeModal={this.toggleModal.bind(this)}
            editRecipe={this.state.showModal}
          /> : ''
        }
        <div className="spacer"></div>
        <Footer />
      </div>
    );
  }
}

module.exports = App;
