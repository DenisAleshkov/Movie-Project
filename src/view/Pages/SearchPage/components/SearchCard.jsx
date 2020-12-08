import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { PosterCardStyles } from "./../../components/PosterCardStyles";
import { compose } from "redux";
import { connect } from "react-redux";

import {
  getLibraryList,
  removeItemFromLibrary,
  setMovieToLibrary,
} from "../../../../store/actions/movieAction";

class PosterCard extends React.Component {
  componentDidMount() {
    this.props.getLibraryList();
  }
  addHandler = (e) => {
    this.props.setMovieToLibrary(
      e.target.id,
      this.props.title,
      this.props.poster
    );
  };
  deleteHandler = (e) => {
    this.props.removeItemFromLibrary(e.target.id)
  }
  isFavorite = () => {
    if (this.props.library.length) {
      return this.props.library.map((item) =>
        +item.id === +this.props.id ? (
          <Favorite
            key={item.id}
            id={this.props.id}
            className={this.props.classes.favoriteWithBorder}
            color="secondary"
            onClick={this.deleteHandler}
          />
        ) : (
          <FavoriteBorder
            key={item.id}
            id={this.props.id}
            className={this.props.classes.favoriteWithBorder}
            color="secondary"
            onClick={this.addHandler}
          />
        )
      );
    } else {
      return (
        <FavoriteBorder
          key={this.props.id}
          id={this.props.id}
          className={this.props.classes.favoriteWithBorder}
          color="secondary"
          onClick={this.addHandler}
        />
      );
    }
  };

  render() {
    const { poster, title, classes, overview } = this.props;
    return (
      <Card className={classes.root}>
        
        {this.isFavorite()}
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500/${poster}`}
        />

        <CardContent className={classes.title}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            {title}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer.movies,
    library: state.MoviesReducer.library,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getLibraryList: () => dispatch(getLibraryList()),
  setMovieToLibrary: (id, title, poster) =>
    dispatch(setMovieToLibrary(id, title, poster)),
    removeItemFromLibrary: (id) => dispatch(removeItemFromLibrary(id)),
});

export default compose(
  withStyles(PosterCardStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PosterCard);
