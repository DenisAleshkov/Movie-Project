import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../utils/Loading/Loading";
import { getGenres, getMovies } from "./../../../store/actions/movieAction";
import PosterCard from "./../components/PosterCard";

class Movie extends Component {
  componentDidMount() {
    this.props.getMovies(1);
    this.props.getGenres("movie");
  }
  showMovies = () => {
    return this.props.movies.moviesList.map((item) => {
      return (
        <PosterCard
          key={item.id}
          id={item.id}
          poster={item.backdrop_path}
          title={item.title}
        />
      );
    });
  };

  render() {
    return <>{this.props.isLoading ? <Loading /> : this.showMovies()}</>;
  }
}

const mapStateToProps = (state) => ({
  movies: state.MoviesReducer.movies,
  isLoading: state.LoadingReducer.isLoading,
});
const mapDispatchToProps = (dispatch) => ({
  getMovies: (page) => dispatch(getMovies(page)),
  getGenres: (type) => dispatch(getGenres(type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
