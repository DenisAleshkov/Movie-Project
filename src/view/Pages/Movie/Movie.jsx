import React, { Component } from "react";
import PosterCard from "./../components/PosterCard/PosterCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import {
  getGenres,
  getMovies,
  setMovies,
} from "./../../../store/actions/movieAction";
class Movie extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.loader = React.createRef();
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
  }

  loadMore = (entries) => {
    this.setState({
      isLoading: true,
    });
    const target = entries[0];
    if (target.isIntersecting) {
      this.props.getMovies(this.props.moviesCurrentPage + 1);
      this.setState({
        isLoading: false,
      });
    }
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
            vote={item.vote_average}
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
            display: this.state.isLoading ? "flex" : "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
          ref={this.loader}
        >
          {this.state.isLoading && <CircularProgress />}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer.movies,
    moviesCurrentPage: state.MoviesReducer.moviesCurrentPage,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getMovies: (page) => dispatch(getMovies(page)),
  getGenres: (type) => dispatch(getGenres(type)),
  setMovies: (payload) => dispatch(setMovies(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
