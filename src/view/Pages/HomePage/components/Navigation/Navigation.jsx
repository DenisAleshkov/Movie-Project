import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { NavigationStyle } from "./NavigationStyle";
import { Drawer, CssBaseline, IconButton, Container } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NavBar from "./../NavBar/NavBar";
import SideBar from "./../Sidebar/SideBar";
import Loading from "./../../../../utils/Loading/Loading";
import { compose } from "redux";
import { connect } from "react-redux";
import { signOut } from "../../../../../store/actions/authAction";
import {
  getGenres,
  searchMovies,
} from "../../../../../store/actions/movieAction";
import { Route, Switch } from "react-router-dom";
import Library from "../../../Library/Library";
import Movie from "./../../../Movie/Movie";
import TV from "./../../../TV/TV";
import SearchPage from "./../../../SearchPage/SearchPage";

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
  showContent = () => {
    return this.props.isLoading && <Loading />;
  };
  render() {
    const { classes, Content, location } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          classes={classes}
          open={this.state.open}
          location={location}
          signOut={this.props.signOut}
          history={this.props.history}
          getGenres={this.props.getGenres}
          genres={this.props.genres}
          movies={this.props.movies}
          searchMovies={this.props.searchMovies}
          count={this.props.library.length}
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
          <SideBar
            classes={classes}
            location={location}
            count={this.props.library.length}
          />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Container className={classes.items}>
            <Switch>
              <Route path="/" exact>
                <Movie />
              </Route>
              <Route path="/home" exact>
                <Movie />
              </Route>
              <Route path="/home/movies" exact>
                <Movie />
              </Route>
              <Route path="/home/tv" exact>
                <TV />
              </Route>
              <Route path="/home/library" exact>
                <Library />
              </Route>
              <Route path="/home/search" exact>
                <SearchPage />
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genres: state.MoviesReducer.genres,
    movies: state.MoviesReducer.movies,
    library: state.MoviesReducer.library,
    isLoading: state.LoadingReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: (history) => dispatch(signOut(history)),
  getGenres: (type) => dispatch(getGenres(type)),
  searchMovies: (data, histry) => dispatch(searchMovies(data, histry)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(NavigationStyle, { withTheme: true })
)(HomePage);
