import React, { Component } from "react";
import LibraryCard from "./components/LibraryCard";
import NotFound from "./../../utils/NotFound/NotFound";
import { connect } from "react-redux";
import { getLibraryList } from "../../../store/actions/movieAction";

class Library extends Component {
  componentDidMount() {
    this.props.getLibraryList();
  }
  showLibrary = () =>
    this.props.library.map((item) => (
      <LibraryCard
        key={item.id}
        id={item.id}
        title={item.title}
        poster={item.poster}
      />
    ));
  render() {
    return (
      <>{this.props.library.length ? this.showLibrary() : <NotFound title="Empty library" />}</>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    library: state.MoviesReducer.library,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getLibraryList: () => dispatch(getLibraryList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Library);
