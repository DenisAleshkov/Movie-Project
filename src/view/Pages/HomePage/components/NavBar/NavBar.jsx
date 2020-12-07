import React from "react";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";
import {
  AppBar,
  Box,
  Button,
  Icon,
  InputBase,
  Toolbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  isActive = (url) =>
    this.props.location === url ? this.props.classes.activeNavLink : "";
  signOut = () => {
    this.props.signOut(this.props.history)
  }
  render() {
    const { classes, open } = this.props;
    console.log('this.props', this.props)
    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.navBar}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              className={classes.searchInput}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this.changeHandler}
              inputProps={{ "aria-label": "search", id: "searchText" }}
            />
          </div>
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
              Tv
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
