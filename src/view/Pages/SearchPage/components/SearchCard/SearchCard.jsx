import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { SearchCardStyle } from "./SearchCardStyle";
import DoneIcon from "@material-ui/icons/Done";
import Delete from "@material-ui/icons/DeleteOutline";
import { Chip } from "@material-ui/core";
import EmptyPoster from "./../../../../utils/emptyposter.png";
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
      popularity,
      overview,
      titleTv,
      titleMovie,
      id,
    } = this.props;

    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={
            poster ? `https://image.tmdb.org/t/p/w500/${poster}` : EmptyPoster
          }
          title={titleTv || titleMovie}
        />
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
      </Card>
    );
  }
}

export default withStyles(SearchCardStyle, { withTheme: true })(SearchCard);
