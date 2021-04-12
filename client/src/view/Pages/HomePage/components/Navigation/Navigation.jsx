import React, { Component } from "react";
import clsx from "clsx";
import NavBar from "./../NavBar/NavBar";
import SideBar from "./../Sidebar/SideBar";
import RouteContent from "../RouteContent/RouteContent";
import MenuIcon from "@material-ui/icons/Menu";
import ForwardTwoToneIcon from "@material-ui/icons/ForwardTwoTone";
import { NavigationStyle } from "./NavigationStyle";
import {
  withStyles,
  CircularProgress,
  Drawer,
  Snackbar,
  CssBaseline,
  IconButton,
  Fab,
  Grid,
} from "@material-ui/core";
import {
  getGenres,
  searchMovies,
  searchTV,
  setNotification,
  getCities,
  searchEventsByCity,
} from "../../../../../store/actions/movieAction";
import {
  getDetailsMovie,
  getDetailsTv,
  getSimilarMovies,
  getSimilarTv,
} from "./../../../../../store/actions/detailsAction";
import { Alert } from "@material-ui/lab";
import { compose } from "redux";
import { connect } from "react-redux";
import { signOut } from "../../../../../store/actions/authAction";
import { setInputs } from "../../../../../store/actions/searchAction";
class Navigation extends Component {
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

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = (event) => {
    if (window.pageYOffset > 2500) {
      this.setState({
        icon: true,
      });
    } else {
      this.setState({
        icon: false,
      });
    }
  };

  toggleDrawerOpen = (value) => {
    this.setState({
      open: !value,
    });
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
    if (event.target.value !== undefined && this.state.icon === false) {
      this.scrollTo("end", this.pageToEndRef);
    } else {
      this.scrollTo("start", this.pageToStartRef);
    }
  };
  scrollTo = (to, position) => {
    position.scrollIntoView &&
      position.scrollIntoView({
        block: to,
        behavior: "smooth",
      });
  };
  showScrollIcon = () => (
    <ForwardTwoToneIcon
      className={clsx(this.props.classes.extendedIcon, {
        [this.props.classes.extendedIconStart]: this.state.icon,
        [this.props.classes.extendedIconEnd]: !this.state.icon,
      })}
    />
  );
  render() {
    const { classes, location } = this.props;
    return (
      <div className={classes.root}>
        <div
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
          getCities={this.props.getCities}
          searchEventsByCity={this.props.searchEventsByCity}
          cities={this.props.cities}
          genres={this.props.genres}
          movies={this.props.movies}
          searchMovies={this.props.searchMovies}
          searchTV={this.props.searchTV}
          count={this.props.library.length}
          searchInputs={this.props.searchInputs}
          setInputs={this.props.setInputs}
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
            {this.state.open && (
              <Grid
                item
                xs={1}
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
            )}

            <Grid item xs={this.state.open ? 11 : 12} className={classes.items}>
              {this.props.isNotificationLoading ? (
                <CircularProgress
                  color="secondary"
                  className={this.props.classes.notifLoader}
                />
              ) : (
                this.showNotification()
              )}
              <RouteContent
                getDetailsTv={this.props.getDetailsTv}
                getSimilarTv={this.props.getSimilarTv}
                getDetailsMovie={this.props.getDetailsMovie}
                getSimilarMovies={this.props.getSimilarMovies}
              />
            </Grid>
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

const mapStateToProps = (state) => ({
  genres: state.MoviesReducer.genres,
  movies: state.MoviesReducer.movies,
  library: state.MoviesReducer.library,
  isLoading: state.LoadingReducer.isLoading,
  notification: state.MoviesReducer.notification,
  error: state.MoviesReducer.error,
  isNotificationLoading: state.LoadingReducer.isNotificationLoading,
  searchInputs: state.SearchReducer.searchInputs,
  cities: state.EventReducer.cities,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: (history) => dispatch(signOut(history)),
  getGenres: (type) => dispatch(getGenres(type)),
  getCities: () => dispatch(getCities()),
  searchMovies: (data, history) => dispatch(searchMovies(data, history)),
  searchTV: (data, history) => dispatch(searchTV(data, history)),
  setNotification: (payload) => dispatch(setNotification(payload)),
  getDetailsMovie: (id) => dispatch(getDetailsMovie(id)),
  getSimilarMovies: (id, page) => dispatch(getSimilarMovies(id, page)),
  getDetailsTv: (id) => dispatch(getDetailsTv(id)),
  getSimilarTv: (id, page) => dispatch(getSimilarTv(id, page)),
  setInputs: (payload) => dispatch(setInputs(payload)),
  searchEventsByCity: (cityId, history) =>
    dispatch(searchEventsByCity(cityId, history)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(NavigationStyle, { withTheme: true })
)(Navigation);
