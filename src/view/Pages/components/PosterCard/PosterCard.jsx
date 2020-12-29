import React from "react";
import Rating from "./../Rating/Rating";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import {
  withStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { PosterCardStyle } from "./PosterCardStyle";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getLibraryList,
  removeItemFromLibrary,
  setMovieToLibrary,
} from "../../../../store/actions/movieAction";
import { Link } from "react-router-dom";

class PosterCard extends React.Component {
  componentDidMount() {
    this.props.getLibraryList();
  }
  addHandler = (e) => {
    e.target.id &&
      this.props.setMovieToLibrary(
        e.target.id,
        this.props.title,
        this.props.poster
      );
  };
  deleteHandler = (e) => {
    e.target.id && this.props.removeItemFromLibrary(e.target.id);
  };
  isFavorite = () =>
    this.props.library.filter((item) => +item.id === +this.props.id).length ? (
      <IconButton
        className={this.props.classes.favoriteBtn}
        id={this.props.id}
        onClick={this.deleteHandler}
        key={this.props.id}
      >
        <Favorite id={this.props.id} color="secondary" />
      </IconButton>
    ) : (
      <IconButton
        className={this.props.classes.favoriteBtn}
        id={this.props.id}
        onClick={this.addHandler}
        key={this.props.id}
      >
        <FavoriteBorder id={this.props.id} color="secondary" />
      </IconButton>
    );

  render() {
    const { poster, title, classes, id, vote, to } = this.props;
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
            setRate={this.props.setRate}
            vote={vote}
            type={this.props.type}
          />
        </CardContent>
        <Button
          variant="outlined"
          className={classes.detailsBtn}
          component={Link}
          to={`${to}/${this.props.id}`}
        >
          Details
        </Button>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.MoviesReducer.movies,
  library: state.MoviesReducer.library,
});

const mapDispatchToProps = (dispatch) => ({
  getLibraryList: () => dispatch(getLibraryList()),
  setMovieToLibrary: (id, title, poster) =>
    dispatch(setMovieToLibrary(id, title, poster)),
  removeItemFromLibrary: (id) => dispatch(removeItemFromLibrary(id)),
});

export default compose(
  withStyles(PosterCardStyle, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PosterCard);
