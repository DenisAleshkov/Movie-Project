import React, { Component } from "react";
import clsx from "clsx";
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
      icon: false,
      scrollTop: 0,
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

  scrollHandler = (event) => {
    if (event.target.value !== undefined) {
      event.target.value === "true"
        ? this.scrollTo("start", this.pageToStartRef)
        : this.scrollTo("end", this.pageToEndRef);
    }
  };

  scrollTo = (to, position) => {
    position.scrollIntoView &&
      position.scrollIntoView({
        block: to,
        behavior: "smooth",
      });
    this.setState({
      icon: !this.state.icon,
    });
  };
  scrollPage = (e) => {
    console.log('e', e)
  }
  render() {
    const { classes, location } = this.props;
    return (
      <div className={classes.root}  onScroll={()=>console.log("scroll")}>
        <div
          className={classes.start}
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
          onScroll={()=>console.log("scroll")}
          ref={(el)=>console.log(el)}
          style={{
            overflowY:'auto'
          }}
        >
          <Grid container spacing={1} className={classes.grid}  onScroll={()=>console.log("scroll")}>
            <Grid  onScroll={()=>console.log("scroll")}
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
                onClick={(e)=>this.scrollHandler(e)}
              >
                <ForwardTwoToneIcon
                  className={clsx(classes.extendedIcon, {
                    [classes.extendedIconStart]: this.state.icon,
                    [classes.extendedIconEnd]: !this.state.icon,
                  })}
                />
              </Fab>
            </Grid>
            <Grid item xs={11} className={classes.items}>
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
              </Switch>
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
  searchMovies: (data, history, type) =>
    dispatch(searchMovies(data, history, type)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(NavigationStyle, { withTheme: true })
)(HomePage);
