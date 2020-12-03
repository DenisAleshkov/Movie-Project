import React, { Component } from "react";
import { connect } from "react-redux";
import { getTV } from "../../../store/actions/movieAction";
import PosterCard from "./../components/PosterCard";

class TV extends Component {
  componentDidMount() {
    this.props.getTV(1);
  }
  showTV = () =>
    this.props.tv.tvList.map((item) => (
      <PosterCard
        key={item.id}
        poster={item.backdrop_path}
        title={item.original_name}
        style={{ margin: "20px" }}
      />
    ));
  render() {
    return <>{this.showTV()}</>;
  }
}

const mapStateToProps = (state) => ({ tv: state.MoviesReducer.tv });

const mapDispatchToProps = (dispatch) => ({
  getTV: (page) => dispatch(getTV(page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TV);
