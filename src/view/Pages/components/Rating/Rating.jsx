import React, { Component } from "react";
import { Rating as MuiRating } from "@material-ui/lab";
import { RatingStyle } from "./RatingStyle";
import { withStyles } from "@material-ui/core";

class Rating extends Component {
  handleRateChange = (event, value) => {
    this.props.setRate(+event.target.name, value);
  };

  render() {
    const { classes, style } = this.props;
    return (
      <>
        <MuiRating
          style={style}
          name={`${this.props.id}`}
          className={classes.rate}
          onChange={this.handleRateChange}
          defaultValue={this.props.vote}
          precision={0.5}
          min={0.5}
          max={10}
        />
      </>
    );
  }
}

export default withStyles(RatingStyle, { withTheme: true })(Rating);
