import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    backgroundColor: "#0041e6",
    width: 250,
    height: 300,
    margin: "20px",
    "&:hover $media": {
      opacity: "0.5",
    },
    "&:hover $title": {
      opacity: 1,
      transform: "scale(1)",
      transition: "transform .2s ease, opacity 1s ease",
    },
  },
  media: {
    cursor: "pointer",
    paddingTop: "56.25%",
    transition: "all 0.4s ease",
    height: "100%",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    margin: "auto",
    height: "50px",
    lineHeight: "30px",
    cursor: "pointer",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    transform: "scale(0)",
    transition: "transform .5s ease, opacity .7s ease",
  },
}));

const PosterCard = ({ poster, title }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
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
};
export default PosterCard;
