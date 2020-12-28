import React from "react";
import clsx from "clsx";
import SearchForm from "./components/SearchForm/SearchForm";
import { AppBar, Box, Button, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  isActive = (url) =>
    this.props.location === url ? this.props.classes.activeNavLink : "";
  signOut = () => {
    this.props.signOut(this.props.history);
  };
  showSearchForm() {
    if (
      this.props.location === "/home/movie" ||
      this.props.location === "/home/tv"
    ) {
      return (
        <SearchForm
          getGenres={this.props.getGenres}
          genres={this.props.genres}
          location={this.props.location}
          movies={this.props.movies}
          searchMovies={this.props.searchMovies}
          searchTV={this.props.searchTV}
          history={this.props.history}
          searchInputs={this.props.searchInputs}
          setInputs={this.props.setInputs}
        />
      );
    }
  }
  render() {
    const { classes, open } = this.props;
    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.navBar}>
          {this.showSearchForm()}
          <Box className={clsx(classes.navMenu)}>
            <Button
              component={Link}
              to="/home/movie"
              color="inherit"
              className={this.isActive("/home/movie") || this.isActive("/home")}
            >
              Movies
            </Button>
            <Button
              component={Link}
              to="/home/tv"
              color="inherit"
              className={this.isActive("/home/tv")}
              onClick={this.isActive}
            >
              TV Shows
            </Button>
            <Button
              component={Link}
              to="/home/library"
              color="inherit"
              className={this.isActive("/home/library")}
              onClick={this.isActive}
            >
              my Library
            </Button>
            <Button
              component={Link}
              to="/blog"
              color="inherit"
              className={this.isActive("/blog")}
              onClick={this.isActive}
            >
              Blog
            </Button>
            <Button
              className={classes.signOutBtn}
              onClick={this.signOut}
              variant="outlined"
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}
export default NavBar;
