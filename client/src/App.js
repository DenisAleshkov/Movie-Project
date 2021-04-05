import React from "react";
import firebase from "firebase";
import Register from "./view/Auth/Register/Register";
import HomePage from "./view/Pages/HomePage/HomePage";
import Blog from "./view/Pages/Blog/Blog"
import Login from "./view/Auth/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { Switch, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { FIREBASE_CONFIG } from "./store/constants";
import "./App.css";

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <PrivateRoute
            component={HomePage}
            isAuth={this.props.isAuth}
            path="/"
            exact
          />
          <PrivateRoute
            component={HomePage}
            isAuth={this.props.isAuth}
            path="/home"
          />
          <PrivateRoute
            component={Blog}
            isAuth={this.props.isAuth}
            path="/blog"
          />
          <PublicRoute
            component={Login}
            isAuth={this.props.isAuth}
            path="/auth"
            exact
          />
          <PublicRoute
            component={Login}
            isAuth={this.props.isAuth}
            path="/auth/login"
            exact
          />
          <PublicRoute
            component={Register}
            isAuth={this.props.isAuth}
            path="/auth/register"
            exact
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.AuthReducer.isAuth,
});

export default compose(withRouter, connect(mapStateToProps))(App);
