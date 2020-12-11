import React, { Component } from "react";
import { connect } from "react-redux";
import { getTV, getGenres } from "../../../store/actions/movieAction";
import Loading from "../../utils/Loading/Loading";
import PosterCard from "./../components/PosterCard/PosterCard";

class TV extends Component {
  componentDidMount() {
    this.props.getTV(1);
    this.props.getGenres("tv");
  }
  showTV = () =>
    this.props.tv.tvList.map((item) => (
      <PosterCard
        key={item.id}
        id={item.id}
        poster={item.poster_path}
        title={item.original_name}
        vote={item.vote_average}
      />
    ));
  render() {
    return <>{this.props.isLoading ? <Loading /> : this.showTV()}</>;
  }
}

const mapStateToProps = (state) => ({
  tv: state.MoviesReducer.tv,
  isLoading: state.LoadingReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getTV: (page) => dispatch(getTV(page)),
  getGenres: (type) => dispatch(getGenres(type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TV);
