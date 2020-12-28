import React, { Component } from "react";
import {
  withStyles,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
} from "@material-ui/core";
import { RatedCardStyle } from "./RatedCardStyle";

class RatedCard extends Component {
  render() {
    const { classes, vote, title, poster, name } = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {vote}
            </Avatar>
          }
          title={title || name}
        />
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500/${poster}`}
          title={title || name}
        />
      </Card>
    );
  }
}

export default withStyles(RatedCardStyle, { withTheme: true })(RatedCard);
