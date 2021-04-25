import React, { Component } from "react";
import SimilarMovies from "./components/SimilarMovies/SimilarMovies";
import Loading from "./../../utils/Loading/Loading";
import { Rating } from "@material-ui/lab";
import {
  Box,
  CardMedia,
  Container,
  Typography,
  withStyles,
  Avatar,
  Chip,
} from "@material-ui/core";
import { DetailsStyle } from "./DetailsStyle.js";
import { compose } from "redux";
import { connect } from "react-redux";
import { formatMoney, timeConvert, FormatDate } from "./../../utils/functions";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { SET_EVENTS } from "../../../store/constants";

const Details = (props) => {
  console.log('props', props)
  const { classes } = props;
  const [loading, setLoading] = React.useState(true)
  const [event, setEvent] = React.useState(null);
  console.log('events', event)
  React.useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/api/event", {
        params: {
          id: props.match.params.id,
        },
      })
      .then((data) => {
        setEvent(data.data.rows[0])
        setLoading(false)
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)
      });
  }, []);

  if(loading) return <Loading />

  return (
    <Container maxWidth="md" className={classes.root}>
      <Box className={classes.header}>
        <Box
          className={classes.headerWrapper}
          style={{
            backgroundImage: `url(http://localhost:5000/${event.img})`,
          }}
        >
          <Box className={classes.body}>
            <Box className={classes.bodyContent}>
              <Box className={classes.headerTitle}>
                <Typography
                  className={classes.titleText}
                  variant="h2"
                  gutterBottom
                >
                  {event.name}
                </Typography>
              </Box>
              <Box className={classes.headerRate}>
                <Avatar>{event.rating}</Avatar>
                <Rating name="read-only" value={event.rating || 0} max={10} readOnly />
              </Box>
              <Box className={classes.headerNumber}>
                <Typography variant="subtitle2" gutterBottom>
                  {event.rating}
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ marginLeft: 10 }}
                >
                {new Date(event.createdAt).getFullYear()}
                </Typography>
              </Box>
              <Box className={classes.description}>
                <Typography variant="subtitle2" gutterBottom>
                 {event.description}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.footer}></Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.boxOverview}>
        <Box className={classes.poster} style={{ height: 400 }}>
          <CardMedia
            image={`https://image.tmdb.org/t/p/w500/`}
            title="Paella dish"
            style={{ width: 265, height: "100%" }}
          />
        </Box>
        <Box className={classes.overview}>
          <Box className={classes.overviewheader}>
            <Typography variant="h5" gutterBottom>
              details.title
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.overviewText}
            >
              details.overview
            </Typography>
          </Box>
          <Box className={classes.overviewContent}>
            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Released:
            </Typography>
            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Status:
            </Typography>

            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Budget:5435
            </Typography>

            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Laguage: details.original_language
            </Typography>

            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Next episode:next
            </Typography>

            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Runtime: 41234
            </Typography>

            <Box className={classes.genres}>
              <Typography variant="subtitle1" gutterBottom>
                Genres:
              </Typography>
            </Box>

            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Number of episodes: 3
            </Typography>

            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Number of Seasons:2
            </Typography>

            <Box className={classes.production}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ margin: 0 }}
              >
                Production:
              </Typography>
              <Typography>this.showCompanies</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default compose(withStyles(DetailsStyle, { withTheme: true }))(Details);
