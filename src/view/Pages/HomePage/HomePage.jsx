import React from "react";
import firebase from "firebase";
import Navigation from "./components/Navigation/Navigation";
import { setUser } from "./../../../store/actions/authAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
class HomePage extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.props.setUser({ ...doc.data(), id: doc.id });
          });
      }
    });
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

const mapStateToProps = (state) => {
  console.log("state", state);
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch(setUser(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(HomePage);
