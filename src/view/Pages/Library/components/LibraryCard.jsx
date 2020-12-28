import React from "react";
import Delete from "@material-ui/icons/DeleteOutline";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  withStyles,
} from "@material-ui/core";
import { LibraryCardStyles } from "./LibraryCardStyles";
class PosterCard extends React.Component {
  clickHandler = (e) => {
    e.target.id && this.props.removeItemFromLibrary(e.target.id);
  };
  render() {
    const { poster, title, classes, id } = this.props;
    return (
      <Card className={classes.root}>
        <Delete
          id={id}
          onClick={this.clickHandler}
          className={classes.deleteIcon}
        />
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500/${poster}`}
          title="Paella dish"
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
export default withStyles(LibraryCardStyles, { withTheme: true })(PosterCard);
