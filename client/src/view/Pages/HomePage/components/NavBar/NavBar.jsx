import React from "react";
import clsx from "clsx";
import SearchForm from "./components/SearchForm/SearchForm";
import CreateForm from "./components/CreateForm/CreateForm";
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
        <>
          <SearchForm
            getCities={this.props.getCities}
            searchEventsByCity={this.props.searchEventsByCity}
            cities={this.props.cities}
            location={this.props.location}
            history={this.props.history}
            searchInputs={this.props.searchInputs}
            setInputs={this.props.setInputs}
          />
          <CreateForm
            getCities={this.props.getCities}
            searchEventsByCity={this.props.searchEventsByCity}
            cities={this.props.cities}
            types={this.props.types}
            location={this.props.location}
            history={this.props.history}
            searchInputs={this.props.searchInputs}
            setInputs={this.props.setInputs}
          />
        </>
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
              Events
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
