import { Container } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import React from "react";
import Navigation from "./components/Navigation/Navigation"
import Movie from "./../Movie/Movie";
import TV from "./../TV/TV";

const HomePage = () => {
  return <Navigation  Content={
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
        <Route path="/home/movies" exact>
          <Movie />
        </Route>
        <Route path="/home" exact>
          <Movie />
        </Route>
        <Route path="/home/tv" exact>
          <TV />
        </Route>
      </Switch>
    </Container>
  } />;
};

export default HomePage;
