import React from "react";
import Library from "../../../Library/Library";
import Movie from "./../../../Movie/Movie";
import SearchPage from "./../../../SearchPage/SearchPage";
import Profile from "../../../Profile/Profile";
import Details from "./../../../Details/Details";
import { Route, Switch } from "react-router-dom";
const RouteContent = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Movie />
      </Route>
      <Route path="/home" exact>
        <Movie />
      </Route>
      <Route
        path="/home/movie"
        exact
        render={(props) => <Movie {...props} />}
      />
      <Route path="/home/library" exact>
        <Library />
      </Route>
      <Route path="/home/search" exact>
        <SearchPage />
      </Route>
      <Route
        path="/home/details/movies/:id"
        exact
        render={(props) => <Details {...props}/>}
      />
      <Route path="/home/profile" exact>
        <Profile />
      </Route>
    </Switch>
  );
};

export default RouteContent;
