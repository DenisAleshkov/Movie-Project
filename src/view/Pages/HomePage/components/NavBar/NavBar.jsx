import React from "react";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";
import { AppBar, Box, Button, InputBase, Toolbar } from "@material-ui/core";
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
  render() {
    const { classes, open, changeHandler } = this.props;

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
              onChange={changeHandler}
              inputProps={{ "aria-label": "search", id: "searchText" }}
            />
          </div>
          <Box className={clsx(classes.navMenu)}>
            <Button component={Link} to="/home/movies" color="inherit">
              Movies
            </Button>
            <Button component={Link} to="/home/tv" color="inherit">
              Tv
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}
export default NavBar;
