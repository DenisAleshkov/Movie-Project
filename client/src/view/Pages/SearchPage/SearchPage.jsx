import React, { Component } from "react";
import SearchCard from "./components/SearchCard/SearchCard";
import { connect } from "react-redux";
import {
  getLibraryList,
  removeItemFromLibrary,
  setMovieRate,
  setMovieToLibrary,
  setTvRate,
} from "../../../store/actions/movieAction";
import Loading from "../../utils/Loading/Loading";
import NotFound from "../../utils/NotFound/NotFound";

class SearchPage extends Component {

  showMovies = () => {
    if (this.props.events.length) {
      return this.props.events.map((item) => (
        <SearchCard
          // setTvRate={this.props.setTvRate}
          key={item.id}
          id={item.id}
          popularity={item.rating}
          poster={item.img}
          titleMovie={item.name}
          titleTv={item.original_name}
          type={item.type}
          vote={item.rating}
          popularity={item.price}
          library={this.props.library}
          getLibraryList={this.props.getLibraryList}
          setMovieToLibrary={this.props.setMovieToLibrary}
          removeItemFromLibrary={this.props.removeItemFromLibrary}
          // setMovieRate={this.props.setMovieRate}
        />
      ));
    }
    return <NotFound title="Not Found" />;
  };
  render() {
    console.log(this.props)
    return <>{this.props.isLoading ? <Loading /> : this.showMovies()}</>;
  }
}

const mapStateToProps = (state) => ({
  searchMovies: state.MoviesReducer.searchMovies,
  library: state.MoviesReducer.library,
  isLoading: state.LoadingReducer.isLoading,
  events: state.EventReducer.events
})

const mapDispatchToProps = (dispatch) => ({
  getLibraryList: () => dispatch(getLibraryList()),
  setMovieToLibrary: (id, title, poster) =>
    dispatch(setMovieToLibrary(id, title, poster)),
  removeItemFromLibrary: (id) => dispatch(removeItemFromLibrary(id)),
  setMovieRate: (id, value) => dispatch(setMovieRate(id, value)),
  setTvRate: (id, value) => dispatch(setTvRate(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
