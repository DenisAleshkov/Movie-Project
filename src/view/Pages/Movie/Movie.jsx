import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "./../../../store/actions/movieAction";
import PosterCard from "./../components/PosterCard";

class Movie extends Component {
  componentDidMount() {
    this.props.getMovies(1);
  }
  showMovies = () =>
    this.props.movies.moviesList.map((item) => (
      <PosterCard
        key={item.id}
        poster={item.backdrop_path}
        title={item.title}
        style={{ margin: "20px" }}
      />
    ));
  render() {
    return <>{this.showMovies()}</>;
  }
}

const mapStateToProps = (state) => ({
  movies: state.MoviesReducer.movies,
});
const mapDispatchToProps = (dispatch) => ({
  getMovies: (page) => dispatch(getMovies(page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
