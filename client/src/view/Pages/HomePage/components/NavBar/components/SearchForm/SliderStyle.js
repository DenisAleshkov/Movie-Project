import React from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 220,

  },
  margin: {
    height: theme.spacing(3),
  },
 
}));

const PrettoSlider = withStyles({
  root: {
    color: "#565050",
    height: 8,
  },
  thumb: {
    height: 35,
    width: 0,
    marginTop: 0,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  track: {
    height: 35,
    borderRadius: 10,
    color: "#0a8a26de"
  },
  rail: {
    height: 35,
    borderRadius: 10,
    opacity: 1,
  },
})(Slider);

function CustomizedSlider({
  min,
  max,
  defaultValue,
  onChange,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PrettoSlider
        aria-label="pretto slider"
        defaultValue={defaultValue}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        onChange={onChange}
      />
    </div>
  );
}

export default CustomizedSlider;
