import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import { LibraryCardStyles } from "./LibraryCardStyles";
import { compose } from "redux";
import { connect } from "react-redux";
import Delete from "@material-ui/icons/DeleteOutline";
import { removeItemFromLibrary } from "../../../../store/actions/movieAction";

class PosterCard extends React.Component {
  clickHandler = (e) => {
    this.props.removeItemFromLibrary(e.target.id)
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

const mapStateToProps = (state) => {
  return {
    library: state.MoviesReducer.library,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeItemFromLibrary: (id) => dispatch(removeItemFromLibrary(id)),
});

export default compose(
  withStyles(LibraryCardStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PosterCard);
