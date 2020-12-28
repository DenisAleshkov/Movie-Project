import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import Delete from "@material-ui/icons/DeleteOutline";
import EmptyPoster from "./../../../../utils/emptyposter.png";
import {
  CardMedia,
  CardHeader,
  Card,
  withStyles,
  Avatar,
  Chip,
  Box,
} from "@material-ui/core";
import { SearchCardStyle } from "./SearchCardStyle";
import Rating from "./../../../components/Rating/Rating";

class SearchCard extends React.Component {
  componentDidMount() {
    this.props.getLibraryList();
  }
  handleAdd = (e) => {
    this.props.setMovieToLibrary(
      e.target.getAttribute("id"),
      this.props.title,
      this.props.poster
    );
  };
  handleDelete = (e) => {
    this.props.removeItemFromLibrary(e.target.getAttribute("id"));
  };

  showChip = () => {
    const inLibrary = this.props.library.filter(
      (item) => +item.id === +this.props.id
    );
    if (inLibrary.length) {
      return (
        <Chip
          id={this.props.id}
          color="secondary"
          label="Delete"
          onDelete={this.handleDelete}
          deleteIcon={<Delete id={this.props.id} />}
          className={this.props.classes.actionChip}
        />
      );
    } else {
      return (
        <Chip
          label="Add"
          onDelete={this.handleAdd}
          color="secondary"
          deleteIcon={<DoneIcon id={this.props.id} />}
          className={this.props.classes.actionChip}
        />
      );
    }
  };

  render() {
    const {
      classes,
      poster,
      vote,
      titleTv,
      titleMovie,
    } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {vote}
            </Avatar>
          }
          action={this.showChip()}
          title={titleTv || titleMovie}
        />
        <CardMedia
          className={classes.media}
          image={
            poster ? `https://image.tmdb.org/t/p/w500/${poster}` : EmptyPoster
          }
          title={titleTv || titleMovie}
        />
        <Box className={classes.cardAction}>
          <Rating
            style={{ margin: 0, padding: 0 }}
            id={this.props.id}
            isNotificationLoading={this.props.isNotificationLoading}
            setMovieRate={this.props.setMovieRate}
            setTvRate={this.props.setTvRate}
            vote={this.props.vote}
            type={this.props.type}
          />
        </Box>
      </Card>
    );
  }
}

export default withStyles(SearchCardStyle, { withTheme: true })(SearchCard);
