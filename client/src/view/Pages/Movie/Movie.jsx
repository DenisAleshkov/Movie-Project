import React, { Component } from "react";
import PosterCard from "./../components/PosterCard/PosterCard";
import Types from "../HomePage/components/Types/Types";
import Locations from "../HomePage/components/Locations/Locations";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import {
  getEvents,
  getMovies,
  setMovieRate,
} from "./../../../store/actions/movieAction";
class Movie extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getEvents();
  }

  showMovies = () => {
    if (this.props.events.length) {
      return this.props.events.map((item) => (
        <PosterCard
          type="movie"
          to="/home/details/movies"
          key={item.id}
          id={item.id}
          poster={item.img}
          title={item.name}
          rating={item.rating}
        />
      ));
    }
  };

  render() {
    if (this.props.loading) {
      return <CircularProgress />;
    }
    return (
      <>
        {this.props.city && <Locations />}
        <Types types={this.props.types} />
        {this.showMovies()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.MoviesReducer.movies,
  types: state.MoviesReducer.types,
  moviesCurrentPage: state.MoviesReducer.moviesCurrentPage,
  events: state.EventReducer.events,
  city: state.MoviesReducer.city,
  loading: state.LoadingReducer.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getMovies: (page) => dispatch(getMovies(page)),
  setMovieRate: (id, value) => dispatch(setMovieRate(id, value)),
  getEvents: () => dispatch(getEvents()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
