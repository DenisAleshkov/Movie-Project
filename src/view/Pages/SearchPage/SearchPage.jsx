import React, { Component } from "react";
import SearchCard from "./components/SearchCard/SearchCard";
import { connect } from "react-redux";
import {
  getLibraryList,
  removeItemFromLibrary,
  setMovieToLibrary,
} from "../../../store/actions/movieAction";
import Loading from "../../utils/Loading/Loading";
import NotFound from "../../utils/NotFound/NotFound";

class SearchPage extends Component {
  showMovies = () => {
    if(this.props.searchMovies.length){
    return this.props.searchMovies.map((item) => {
      return (
        <SearchCard
          key={item.id}
          id={item.id}
          popularity={item.vote_count}
          poster={item.poster_path}
          titleMovie={item.title}
          titleTv={item.original_name}
          vote={item.vote_average}
          popularity={item.popularity}
          overview={item.overview}
          library={this.props.library}
          getLibraryList={this.props.getLibraryList}
          setMovieToLibrary={this.props.setMovieToLibrary}
          removeItemFromLibrary={this.props.removeItemFromLibrary}
        />
      );
    });
  }else{
    return <NotFound title="Not Found" />
  }
  };
  render() {
    return <>{this.props.isLoading ? <Loading /> : this.showMovies()}</>;
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    searchMovies: state.MoviesReducer.searchMovies,
    library: state.MoviesReducer.library,
    isLoading: state.LoadingReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getLibraryList: () => dispatch(getLibraryList()),
  setMovieToLibrary: (id, title, poster) =>
    dispatch(setMovieToLibrary(id, title, poster)),
  removeItemFromLibrary: (id) => dispatch(removeItemFromLibrary(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
