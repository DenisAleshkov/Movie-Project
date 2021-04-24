import React, { Component } from "react";
import axios from "axios";
import { Rating as MuiRating } from "@material-ui/lab";
import { RatingStyle } from "./RatingStyle";
import { withStyles } from "@material-ui/core";

class Rating extends Component {
  handleRateChange = (event, value) => {
    axios
      .post("http://localhost:5000/api/event/rateEvent", {
        rating: value,
        eventId: +event.target.name,
        userId: 1,
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("error", error));
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
          defaultValue={this.props.rating}
          precision={0.5}
          min={0.5}
          max={10}
        />
      </>
    );
  }
}

export default withStyles(RatingStyle, { withTheme: true })(Rating);
