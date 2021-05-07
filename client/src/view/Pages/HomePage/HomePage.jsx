import React from "react";
import Navigation from "./components/Navigation/Navigation";
import { isAuth } from "./../../../store/actions/authAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
class HomePage extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token")
    this.props.isAuth(token)
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  isAuth: (token) => dispatch(isAuth(token))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(HomePage);
