import { Container } from "@material-ui/core";
import { Switch, Route, withRouter } from "react-router-dom";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Movie from "./../Movie/Movie";
import TV from "./../TV/TV";
import Library from "../Library/Library";

class HomePage extends React.Component {
  render() {
    return (
      <Navigation
        location={this.props.location.pathname}
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
              <Route path="/" exact>
                <Movie />
              </Route>
              <Route path="/home" exact>
                <Movie />
              </Route>
              <Route path="/home/movies" exact>
                <Movie />
              </Route>
              <Route path="/home/tv" exact>
                <TV />
              </Route>
              <Route path="/home/library" exact>
                <Library />
              </Route>
            </Switch>
          </Container>
        }
      />
    );
  }
}

export default withRouter(HomePage);
