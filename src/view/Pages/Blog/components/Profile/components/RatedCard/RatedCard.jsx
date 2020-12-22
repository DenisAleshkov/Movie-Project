import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
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
