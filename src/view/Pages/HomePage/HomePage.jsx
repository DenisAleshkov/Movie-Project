import React from "react";
import firebase from "firebase"
import Navigation from "./components/Navigation/Navigation";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
class HomePage extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user=>{
      console.log(user)
    })
  }
  render() {
    return (
      <Navigation
        location={this.props.location.pathname}
        history={this.props.history}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return {

  }
}

const mapDispatchToProps = dispatch => ({

})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)  (HomePage);
