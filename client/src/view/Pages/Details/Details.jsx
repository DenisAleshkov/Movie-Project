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
  Button
} from "@material-ui/core";
import { DetailsStyle } from "./DetailsStyle.js";
import { compose } from "redux";
import { connect, useSelector, useDispatch } from "react-redux";
import { getDetailsEvent, buyTicket } from "./../../../store/actions/movieAction";

const Details = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const event = useSelector((state) => state.MoviesReducer.details);

  React.useEffect(() => {
    dispatch(getDetailsEvent(props.match.params.id));
  }, []);

  const buyTicketEvent = () => {dispatch(buyTicket(props.match.params.id, 1))}

  if (!event) return <Loading />;

  return (
    <Container maxWidth="md" className={classes.root}>
      <Box className={classes.header}>
        <Box
          className={classes.headerWrapper}
          style={{
            backgroundImage: `url(http://localhost:5000/${event.event.img})`,
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
                  {event.event.name}
                </Typography>
              </Box>
              <Box className={classes.headerRate}>
                <Avatar>{event.event.rating}</Avatar>
                <Rating
                  name="read-only"
                  value={event.event.rating || 0}
                  max={10}
                  readOnly
                />
              </Box>
              <Box className={classes.headerNumber}>
                <Typography variant="subtitle2" gutterBottom>
                  {event.event.rating}
                </Typography>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ marginLeft: 10 }}
                >
                  {new Date(event.event.createdAt).getFullYear()}
                </Typography>
              </Box>
              <Box className={classes.description}>
                <Typography variant="subtitle2" gutterBottom>
                  {event.event.description}
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
            image={`http://localhost:5000/${event.event.img}`}
            title="Paella dish"
            style={{ width: 265, height: "100%" }}
          />
        </Box>
        <Box className={classes.overview}>
          <Box className={classes.overviewheader}>
            <Typography variant="h5" gutterBottom>
              {event.event.title || event.event.name}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.overviewText}
            >
              {event.event.description}
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
              Status: {event.event.status ? "active" : "unactive"}
            </Typography>

            <Typography
              className={classes.overviewItem}
              variant="subtitle1"
              gutterBottom
            >
              Budget: {event.event.price + "$"}
            </Typography>

            <Box className={classes.genres}>
              <Typography variant="subtitle1" gutterBottom>
                Type: {event.typeName}
              </Typography>
            </Box>
            <Box className={classes.genres}>
              <Typography variant="subtitle1" gutterBottom>
                City: {event.cityName}
              </Typography>
            </Box>
            <Box className={classes.genres}>
              <Typography variant="subtitle1" gutterBottom>
                Location: {event.locationName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button variant="contained" color="primary" onClick={buyTicketEvent}>
        BUY TICKET
      </Button>
    </Container>
  );
};

export default compose(withStyles(DetailsStyle, { withTheme: true }))(Details);
