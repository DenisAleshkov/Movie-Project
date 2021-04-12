import React, { Component } from "react";
import PosterCard from "./../components/PosterCard/PosterCard";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { getEvents, getMovies, setMovieRate } from "./../../../store/actions/movieAction";
class Movie extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getEvents()
  }

  showMovies = () => {
    if (this.props.events.length) {
      console.log('this.props.events', this.props.events)
      return this.props.events.map((item) => (
        <PosterCard
          type="movie"
          to="/home/details/movies"
          key={item.id}
          id={item.id}
          poster={item.img}
          title={item.name}
          vote={5}
          // getDetalis={this.props.getDetailsMovie}
          // getSimilar={this.props.getSimilarMovies}
          // setRate={this.props.setMovieRate}
        />
      ));
    }
  };
  render() {
    return <>{this.showMovies()}</>
  }
}

const mapStateToProps = (state) => ({
  movies: state.MoviesReducer.movies,
  moviesCurrentPage: state.MoviesReducer.moviesCurrentPage,
  events: state.EventReducer.events
});
const mapDispatchToProps = (dispatch) => ({
  getMovies: (page) => dispatch(getMovies(page)),
  setMovieRate: (id, value) => dispatch(setMovieRate(id, value)),
  getEvents: () => dispatch(getEvents())
});
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
