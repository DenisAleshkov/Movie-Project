import React, { Component } from "react";
import LibraryCard from "./components/LibraryCard";
import NotFound from "./../../utils/NotFound/NotFound";
import { connect } from "react-redux";
import {
  getLibraryList,
  removeItemFromLibrary,
} from "../../../store/actions/movieAction";

class Library extends Component {
  componentDidMount() {
    this.props.getLibraryList();
  }
  
  showLibrary = () =>
    this.props.library.map((item) => (
      
      <LibraryCard
        key={item.id}
        id={item.id}
        name={item.name}
        poster={item.poster}
        library={this.props.library}
        removeItemFromLibrary={this.props.removeItemFromLibrary}
      />
    ));
  render() {
    console.log('this.props.library', this.props.library)
    return (
      <>
        {this.props.library.length ? (
          this.showLibrary()
        ) : (
          <NotFound title="Empty library" />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  library: state.MoviesReducer.library,
});
const mapDispatchToProps = (dispatch) => ({
  getLibraryList: () => dispatch(getLibraryList()),
  removeItemFromLibrary: (id) => dispatch(removeItemFromLibrary(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Library);
