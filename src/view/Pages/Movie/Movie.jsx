import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../utils/Loading/Loading";
import {
  getGenres,
  getMovies,
  setMovies,
} from "./../../../store/actions/movieAction";
import PosterCard from "./../components/PosterCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import RootRef from "@material-ui/core/RootRef";
class Movie extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      isLoading: false,
    };
    this.loader = React.createRef();
    this.loader1 = React.createRef();
  }

  componentDidMount() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };

    this.props.getGenres("movie");
    this.observer = new IntersectionObserver(this.loadMore, options);
    if (this.loader && this.loader.current) {
      this.observer.observe(this.loader.current);
    }
  }

  componentWillUnmount() {
    this.observer.unobserve(this.loader.current);
    this.props.setMovies({ results: [] });
  }

  loadMore = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      this.setState({
        page: this.state.page + 1,
        idLoading: true,
      });
      this.props.getMovies(this.state.page);
    }
    this.setState({
      idLoading: false,
    });
  };

  showMovies = () => {
    if (this.props.movies.length) {
      return this.props.movies.map((item) => {
        return (
          <PosterCard
            key={item.id}
            id={item.id}
            poster={item.poster_path}
            title={item.title}
          />
        );
      });
    }
  };

  render() {
    return (
      <>
        {this.showMovies()}
        <div
          style={{
            display: this.props.isLoading ? "flex" : "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
          ref={this.loader}
        >
          {this.state.isLoading && (
            <RootRef rootRef={this.loader1}>
              <CircularProgress />
            </RootRef>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer.movies,
    moviePages: state.MoviesReducer.moviePages,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getMovies: (page) => dispatch(getMovies(page)),
  getGenres: (type) => dispatch(getGenres(type)),
  setMovies: (payload) => dispatch(setMovies(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
