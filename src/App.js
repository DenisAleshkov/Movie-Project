import "./App.css";
import React from "react";
import firebase from "firebase";
import Login from "./view/Auth/Login/Login";
import Movie from "./view/Pages/Movie/Movie";
import TV from "./view/Pages/TV/TV";
import Navigation from "./view/Navigation/Navigation";
import Register from "./view/Auth/Register/Register";
import { Switch, Route, withRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { FIREBASE_CONFIG } from "./store/constants";
firebase.initializeApp(FIREBASE_CONFIG);
class App extends React.Component {
  render() {
    return (
      <div className="App">
        {this.props.location.pathname !== "/login" &&
          this.props.location.pathname !== "/register" && (
            <Navigation
              Content={
                <Container
                  maxWidth="lg"
                  className="items"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Switch>
                    <Route path="/movies" exact>
                      <Movie />
                    </Route>
                    <Route path="/tv" exact>
                      <TV />
                    </Route>
                  </Switch>
                </Container>
              }
            />
          )}
        <Switch>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
