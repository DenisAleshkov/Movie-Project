import React, { Component } from "react";
import clsx from "clsx";
import Snackbar from "@material-ui/core/Snackbar";
import Details from "./../../../Details/Details";
import { withStyles } from "@material-ui/core/styles";
import { NavigationStyle } from "./NavigationStyle";
import {
  Drawer,
  CssBaseline,
  IconButton,
  Container,
  Fab,
  Grid,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NavBar from "./../NavBar/NavBar";
import SideBar from "./../Sidebar/SideBar";
import Loading from "./../../../../utils/Loading/Loading";
import ForwardTwoToneIcon from "@material-ui/icons/ForwardTwoTone";
import { compose } from "redux";
import { connect } from "react-redux";
import { signOut } from "../../../../../store/actions/authAction";
import {
  getGenres,
  searchMovies,
  searchTV,
  setNotification,
} from "../../../../../store/actions/movieAction";
import {
  getDetailsMovie,
  getDetailsTv,
  getSimilarMovies,
  getSimilarTv,
} from "./../../../../../store/actions/detailsAction";
import { Route, Switch } from "react-router-dom";
import Library from "../../../Library/Library";
import Movie from "./../../../Movie/Movie";
import TV from "./../../../TV/TV";
import SearchPage from "./../../../SearchPage/SearchPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
      isActive: false,
      searchText: "",
      icon: false,
      showMessage: false,
    };
    this.pageToEndRef = React.createRef();
    this.pageToStartRef = React.createRef();
    this.scrollRef = React.createRef();
  }

  toggleDrawerOpen = (value) => {
    this.setState({
      open: !value,
    });
  };

  showContent = () => {
    return this.props.isLoading && <Loading />;
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      showMessage: false,
    });
    this.props.setNotification(null);
  };
  showNotification = () => {
    if (this.props.notification) {
      return (
        <Snackbar
          open={!!this.props.notification}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          {this.props.notification && this.props.notification.error ? (
            <Alert severity="error">{this.props.notification.message}</Alert>
          ) : (
            <Alert onClose={this.handleClose} severity="success">
              {this.props.notification.message}
            </Alert>
          )}
        </Snackbar>
      );
    }
  };
  scrollHandler = (event) => {
    if (event.target.value !== undefined && event.target.value === "false") {
      this.scrollTo("end", this.pageToEndRef);
    } else {
      this.scrollTo("start", this.pageToStartRef);
    }
  };
  scrollTo = (to, position) => {
    this.setState({
      icon: !this.state.icon,
    });
    position.scrollIntoView &&
      position.scrollIntoView({
        block: to,
        behavior: "smooth",
      });
  };
  showScrollIcon = () => {
    return (
      <ForwardTwoToneIcon
        className={clsx(this.props.classes.extendedIcon, {
          [this.props.classes.extendedIconStart]: this.state.icon,
          [this.props.classes.extendedIconEnd]: !this.state.icon,
        })}
      />
    );
  };

  render() {
    const { classes, location } = this.props;

    return (
      <div className={classes.root}>
        <div
          onScroll={(e) => console.log("e", e)}
          ref={(el) => {
            this.pageToStartRef = el;
          }}
        ></div>
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
          searchTV={this.props.searchTV}
          count={this.props.library.length}
          rememberInput={this.props.rememberInput}
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
          <Grid container className={classes.grid} style={{ padding: 0 }}>
            <Grid
              item
              xs={1}
              className={classes.scroll}
              className={clsx(classes.scroll, {
                [classes.scrollOpen]: this.state.open,
                [classes.scrollClose]: !this.state.open,
              })}
            >
              <Fab
                variant="extended"
                component="button"
                className={classes.scrollBtn}
                value={this.state.icon}
                onClick={(e) => this.scrollHandler(e)}
              >
                {this.showScrollIcon()}
              </Fab>
            </Grid>
            {this.state.localLoading ? (
              <Loading />
            ) : (
              <Grid
                item
                xs={11}
                className={classes.items}
                onScroll={() => console.log("scroll Grid")}
              >
                {this.props.isNotificationLoading ? (
                  <CircularProgress
                    color="secondary"
                    className={this.props.classes.notifLoader}
                  />
                ) : (
                  this.showNotification()
                )}
                <Switch>
                  <Route path="/" exact>
                    <Movie />
                  </Route>
                  <Route path="/home" exact>
                    <Movie />
                  </Route>
                  <Route path="/home/movie" exact>
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
                  <Route
                    path="/home/details/movies/:id"
                    exact
                    render={(props) => (
                      <Details
                        getDetails={this.props.getDetailsMovie}
                        getSimilar={this.props.getSimilarMovies}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/home/details/tv/:id"
                    exact
                    render={(props) => (
                      <Details
                        getDetails={this.props.getDetailsTv}
                        getSimilar={this.props.getSimilarTv}
                        {...props}
                      />
                    )}
                  />
                </Switch>
              </Grid>
            )}
          </Grid>
        </main>
        <div
          className={classes.end}
          ref={(el) => {
            this.pageToEndRef = el;
          }}
        ></div>
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
    notification: state.MoviesReducer.notification,
    error: state.MoviesReducer.error,
    isNotificationLoading: state.LoadingReducer.isNotificationLoading,
    rememberInput: state.MoviesReducer.rememberInput,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: (history) => dispatch(signOut(history)),
  getGenres: (type) => dispatch(getGenres(type)),
  searchMovies: (data, history) => dispatch(searchMovies(data, history)),
  searchTV: (data, history) => dispatch(searchTV(data, history)),
  setNotification: (payload) => dispatch(setNotification(payload)),
  getDetailsMovie: (id) => dispatch(getDetailsMovie(id)),
  getSimilarMovies: (id, page) => dispatch(getSimilarMovies(id, page)),
  getDetailsTv: (id) => dispatch(getDetailsTv(id)),
  getSimilarTv: (id, page) => dispatch(getSimilarTv(id, page)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(NavigationStyle, { withTheme: true })
)(HomePage);
