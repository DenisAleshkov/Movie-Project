import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Movie from "./view/Pages/Movie/Movie";
import TV from "./view/Pages/TV/TV";
import Navigation from "./view/Navigation/Navigation";
import { Container } from "@material-ui/core";
class App extends React.Component {
  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
