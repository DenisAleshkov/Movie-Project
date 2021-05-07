import React from "react";
import Delete from "@material-ui/icons/DeleteOutline";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  withStyles,
  IconButton,
} from "@material-ui/core";
import { LibraryCardStyles } from "./LibraryCardStyles";
class PosterCard extends React.Component {
  clickHandler = (e) => {
    e.target.id && this.props.removeItemFromLibrary(e.target.id);
  };
  render() {
    const { poster, name, classes, id } = this.props;
    return (
      <Card className={classes.root}>
        <IconButton
          id={id}
          onClick={this.clickHandler}
          className={classes.deleteIcon}
        >
          <Delete id={id} />
        </IconButton>
        <CardMedia
          className={classes.media}
          image={`http://localhost:5000/${poster}`}
          title="Paella dish"
        />

        <CardContent className={classes.title}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            {name}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(LibraryCardStyles, { withTheme: true })(PosterCard);
