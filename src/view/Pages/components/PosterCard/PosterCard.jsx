import React from "react";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import {
  withStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { PosterCardStyle } from "./PosterCardStyle";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getLibraryList,
  removeItemFromLibrary,
  setMovieToLibrary,
  setMovieRate,
} from "../../../../store/actions/movieAction";
import Rating from "./../Rating/Rating";

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
  handleRateChange = (event, value) => {
    this.props.setMovieRate(+event.target.name, value);
  };
  deleteHandler = (e) => {
    this.props.removeItemFromLibrary(e.target.id);
  };
  isFavorite = () => {
    const inLibrary = this.props.library.filter(
      (item) => +item.id === +this.props.id
    );
    return inLibrary.length ? (
      <Favorite
        key={this.props.id}
        id={this.props.id}
        className={this.props.classes.favoriteWithBorder}
        color="secondary"
        onClick={this.deleteHandler}
      />
    ) : (
      <FavoriteBorder
        key={this.props.id}
        id={this.props.id}
        className={this.props.classes.favoriteWithBorder}
        color="secondary"
        onClick={this.addHandler}
      />
    );
  };

  render() {
    const { poster, title, classes, id, vote } = this.props;
    return (
      <Card className={classes.root}>
        {this.isFavorite()}
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500/${poster}`}
          title="Paella dish"
        />
        <CardContent className={classes.title}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            {title}
          </Typography>
          <Rating
            id={id}
            setMovieRate={this.props.setMovieRate}
            vote={vote}
            isNotificationLoading={this.props.isNotificationLoading}
          />
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer.movies,
    library: state.MoviesReducer.library,
    isNotificationLoading: state.MoviesReducer.isNotificationLoading
  };
};

const mapDispatchToProps = (dispatch) => ({
  getLibraryList: () => dispatch(getLibraryList()),
  setMovieToLibrary: (id, title, poster) =>
    dispatch(setMovieToLibrary(id, title, poster)),
  removeItemFromLibrary: (id) => dispatch(removeItemFromLibrary(id)),
  setMovieRate: (id, value) => dispatch(setMovieRate(id, value)),
});

export default compose(
  withStyles(PosterCardStyle, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PosterCard);
