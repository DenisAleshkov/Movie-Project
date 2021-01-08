import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import EmptyPoster from "./../../../../utils/emptyposter.png";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { SimilarMoviesStyle } from "./SimilarMoviesStyle";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
class SimilarMovies extends Component {
  clickHandler = (id) => {
    this.props.getDetails(id);
    this.props.getSimilar(id, 1);
  };

  render() {
    const { classes, movies } = this.props;
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {movies.map((item) => (
            <GridListTile
              component={Link}
              to={`/home/details/${this.props.type}/${item.id}`}
              onClick={() => this.clickHandler(item.id)}
              key={item.id}
              style={{
                width: "25%",
                height: "380px",
              }}
              className={classes.moviesItem}
            >
              <img
                className={classes.poster}
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                    : EmptyPoster
                }
                alt={item.title}
              />

              <Box className={classes.footer}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className={classes.footerText}
                >
                  {item.title}
                </Typography>
                <Rating
                  name="read-only"
                  className={classes.footerRate}
                  defaultValue={item.vote_average / 2}
                  min={0}
                  precision={1}
                  max={5}
                  size="small"
                  readOnly
                />
              </Box>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(SimilarMoviesStyle, { withTheme: true })(
  SimilarMovies
);
