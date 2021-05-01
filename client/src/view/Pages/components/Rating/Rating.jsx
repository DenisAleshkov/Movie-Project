import React, { Component } from "react";
import axios from "axios";
import { Rating as MuiRating } from "@material-ui/lab";
import { RatingStyle } from "./RatingStyle";
import { withStyles } from "@material-ui/core";
import { setEventRate } from "./../../../../store/actions/movieAction";
import { useDispatch } from "react-redux";

const Rating = ({ classes, style, id, rating }) => {
  const dispatch = useDispatch();

  const handleRateChange = (event, value) => {
    dispatch(setEventRate(value, +event.target.name, 1));
  };

  return (
    <>
      <MuiRating
        style={style}
        name={`${id}`}
        className={classes.rate}
        onChange={handleRateChange}
        defaultValue={rating}
        precision={1}
        min={0}
        max={10}
      />
    </>
  );
};

export default withStyles(RatingStyle, { withTheme: true })(Rating);
