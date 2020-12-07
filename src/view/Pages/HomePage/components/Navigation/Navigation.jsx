import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { NavigationStyle } from "./NavigationStyle";
import { Drawer, CssBaseline, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NavBar from "./../NavBar/NavBar";
import SideBar from "./../Sidebar/SideBar";
import { compose } from "redux";
import { connect } from "react-redux";
import { signOut } from "../../../../../store/actions/authAction";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
      isActive: false,
      searchText: "",
    };
  }
  toggleDrawerOpen = (value) => {
    this.setState({
      open: !value,
    });
  };

  render() {
    const { classes, Content, location, history } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          classes={classes}
          open={this.state.open}
          location={location}
          signOut={this.props.signOut}
          history={this.props.history}
        />
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
          <SideBar classes={classes} location={location} />
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

const mapStateToProps = (state) => {
  console.log("state", state);
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  signOut: (history) => dispatch(signOut(history)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(NavigationStyle, { withTheme: true })
)(HomePage);
