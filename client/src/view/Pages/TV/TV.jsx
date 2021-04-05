import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import PosterCard from "./../components/PosterCard/PosterCard";
import { connect } from "react-redux";
import { getTV, getGenres, setTvRate } from "../../../store/actions/movieAction";

class TV extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.loader = React.createRef();
  }
  componentDidMount() {
    this.props.getGenres("tv");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };
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
      this.props.getTV(this.props.tvCurrentPage + 1);
      this.setState({
        isLoading: false,
      });
    }
  };
  showTV = () => {
    if (this.props.tv.length) {
      return this.props.tv.map((item) => (
        <PosterCard
          type="tv"
          to="/home/details/tv"
          key={item.id}
          id={item.id}
          poster={item.poster_path}
          title={item.original_name}
          vote={item.vote_average}
          setRate={this.props.setTvRate}
        />
      ));
    }
  };

  render() {
    return (
      <>
        {this.showTV()}
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

const mapStateToProps = (state) => ({
  tv: state.MoviesReducer.tv,
  tvCurrentPage: state.MoviesReducer.tvCurrentPage,
});

const mapDispatchToProps = (dispatch) => ({
  getTV: (page) => dispatch(getTV(page)),
  getGenres: (type) => dispatch(getGenres(type)),
  setTvRate: (id, value) => dispatch(setTvRate(id, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TV);
