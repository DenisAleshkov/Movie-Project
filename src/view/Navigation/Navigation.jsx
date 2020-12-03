import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { NavigationStyle } from "./NavigationStyle";
import { Drawer, CssBaseline, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
      searchText: "",
    };
  }
  toggleDrawerOpen = (value) => {
    this.setState({
      open: !value,
    });
  };
  render() {
    const { classes, Content } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar classes={classes} open={this.state.open} />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton
              onClick={() => this.toggleDrawerOpen(this.state.open)}
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <SideBar classes={classes} />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          <div className={classes.drawerHeader} />
          {Content}
        </main>
      </div>
    );
  }
}

export default withStyles(NavigationStyle, { withTheme: true })(HomePage);
