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
  render() {
    const { classes, open, genres, movies } = this.props;
    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.navBar}>
          <SearchForm
            getGenres={this.props.getGenres}
            genres={genres}
            location={this.props.location}
            movies={movies}
            searchMovies={this.props.searchMovies}
          />
          <Box className={clsx(classes.navMenu)}>
            <Button
              component={Link}
              to="/home/movies"
              color="inherit"
              className={
                this.isActive("/home/movies") || this.isActive("/home")
              }
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
