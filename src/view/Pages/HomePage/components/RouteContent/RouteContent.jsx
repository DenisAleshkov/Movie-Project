import React from "react";
import Library from "../../../Library/Library";
import Movie from "./../../../Movie/Movie";
import TV from "./../../../TV/TV";
import SearchPage from "./../../../SearchPage/SearchPage";
import Blog from "../../../Blog/Blog";
import Profile from "../../../Profile/Profile";
import Details from "./../../../Details/Details";
import { Route, Switch } from "react-router-dom";
const RouteContent = ({
  getDetailsMovie,
  getSimilarMovies,
  getDetailsTv,
  getSimilarTv,
}) => {
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
      <Route
        path="/home/tv"
        exact
        render={(props) => <TV {...props} />}
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
        render={(props) => (
          <Details
            type="movies"
            getDetails={getDetailsMovie}
            getSimilar={getSimilarMovies}
            {...props}
          />
        )}
      />
      <Route
        path="/home/details/tv/:id"
        exact
        render={(props) => (
          <Details
            type="tv"
            getDetails={getDetailsTv}
            getSimilar={getSimilarTv}
            {...props}
          />
        )}
      />
      <Route path="/home/blog" exact>
        <Blog />
      </Route>
      <Route path="/home/profile" exact>
        <Profile />
      </Route>
    </Switch>
  );
};

export default RouteContent;
