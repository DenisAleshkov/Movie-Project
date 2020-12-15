import React, { Component } from "react";
import SimilarMovies from "./components/Companies/SimilarMovies";
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
import {
  getDetailsMovie,
  getDetailsTv,
  getSimilarMovies,
  getSimilarTv,
} from "../../../store/actions/detailsAction";
import { formatMoney, timeConvert, FormatDate } from "./../../utils/functions";
import { withRouter } from "react-router-dom";

class Details extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getDetails(this.props.match.params.id);
    this.props.getSimilar(this.props.match.params.id, 1);
  }
  showGenres = () => {
    if (Object.entries(this.props.details).length !== 0) {
      return this.props.details.genres.map((item) => {
        return <Chip key={item.id} label={item.name} />;
      });
    }
  };
  showCountries = () => {
    if (Object.entries(this.props.details).length !== 0) {
      return this.props.details.production_countries.map((item) => {
        return (
          <span key={item.id} style={{ marginRight: 15 }}>
            {item.name}
          </span>
        );
      });
    }
  };
  showCompanies = () => {
    if (Object.entries(this.props.details).length !== 0) {
      return this.props.details.production_companies.map((item) => {
        return (
          <span key={item.id} style={{ marginRight: 15 }}>
            {item.name},
          </span>
        );
      });
    }
  };
  showSimilarMovies = () => {
    if (this.props.similarMovies.length) {
      return (
        <Box className={this.props.classes.similarMovies}>
          <Typography
            className={this.props.classes.similarText}
            variant="h4"
            gutterBottom
          >
            Similar movies
          </Typography>
          <SimilarMovies
            movies={this.props.similarMovies}
            history={this.props.history}
          />
        </Box>
      );
    }
  };
  render() {
    const { classes, details, isLoading } = this.props;
    console.log('details', details)
    if (isLoading) return <Loading />;
    return (
      <Container maxWidth="md" className={classes.root}>
        <Box className={classes.header}>
          <Box
            className={classes.headerWrapper}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${details.backdrop_path}`,
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
                    {details.title || details.name}
                  </Typography>
                </Box>
                <Box className={classes.headerRate}>
                  <Avatar>{details.vote_average}</Avatar>
                  <Rating
                    name="read-only"
                    value={details.vote_average || 0}
                    max={10}
                    readOnly
                  />
                </Box>
                <Box className={classes.headerNumber}>
                  <Typography variant="subtitle2" gutterBottom>
                    {details.vote_count} Reviews
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginLeft: 10 }}
                  >
                    {new Date(details.release_date).getFullYear() ||
                      new Date(details.first_air_date).getFullYear()}
                  </Typography>
                  {details.runtime && (
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      style={{ marginLeft: 10 }}
                    >
                      {timeConvert(details.runtime)}
                    </Typography>
                  )}
                </Box>
                <Box className={classes.description}>
                  <Typography variant="subtitle2" gutterBottom>
                    {details.overview}
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
              image={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              title="Paella dish"
              style={{ width: 300, height: "100%" }}
            />
          </Box>
          <Box className={classes.overview}>
            <Box className={classes.overviewheader}>
              <Typography variant="h5" gutterBottom>
                {details.title}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.overviewText}
              >
                {details.overview}
              </Typography>
            </Box>
            <Box className={classes.overviewContent}>
              <Typography
                className={classes.overviewItem}
                variant="subtitle1"
                gutterBottom
              >
                Released:
                {details.release_date
                  ? FormatDate(details.release_date)
                  : FormatDate(details.last_air_date)}
              </Typography>
              <Typography
                className={classes.overviewItem}
                variant="subtitle1"
                gutterBottom
              >
                Status: {details.status}
              </Typography>

              {details.budget > 0 && (
                <Typography
                  className={classes.overviewItem}
                  variant="subtitle1"
                  gutterBottom
                >
                  Budget: {formatMoney(details.budget)}
                </Typography>
              )}
              <Typography
                className={classes.overviewItem}
                variant="subtitle1"
                gutterBottom
              >
                Laguage: {details.original_language}
              </Typography>
              {details.next_episode_to_air && (
                <Typography
                  className={classes.overviewItem}
                  variant="subtitle1"
                  gutterBottom
                >
                  Next episode:{details.next_episode_to_air.name}{" "}
                  {FormatDate(details.next_episode_to_air.air_date)}
                </Typography>
              )}
              {details.runtime && (
                <Typography
                  className={classes.overviewItem}
                  variant="subtitle1"
                  gutterBottom
                >
                  Runtime: {timeConvert(details.runtime)}
                </Typography>
              )}
              <Box className={classes.genres}>
                <Typography variant="subtitle1" gutterBottom>
                  Genres:
                </Typography>
                {this.showGenres()}
              </Box>
              {details.number_of_episodes && (
                <Typography
                  className={classes.overviewItem}
                  variant="subtitle1"
                  gutterBottom
                >
                  Number of episodes:{details.number_of_episodes}
                </Typography>
              )}
              {details.number_of_seasons && (
                <Typography
                  className={classes.overviewItem}
                  variant="subtitle1"
                  gutterBottom
                >
                  Number of Seasons:{details.number_of_seasons}
                </Typography>
              )}
              <Box className={classes.production}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  style={{ margin: 0 }}
                >
                  Production:
                </Typography>
                {this.showCompanies()}
              </Box>
            </Box>
          </Box>
        </Box>
        {this.showSimilarMovies()}
        {details.created_by && (
          <Box className={classes.poster} style={{ height: 400 }}>
            <Box className={classes.boxOverview}>
              <Box className={classes.poster} style={{ height: 400 }}>
                <CardMedia
                  image={`https://image.tmdb.org/t/p/w500/${details.created_by[0].profile_path}`}
                  title="Paella dish"
                  style={{ width: 300, height: "100%" }}
                />
              </Box>
              <Box className={classes.overview}>
                <Box className={classes.overviewheader}>
                  <Typography variant="h5" gutterBottom>
                    {details.created_by[0].name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.DetailsReducer.details,
    similarMovies: state.DetailsReducer.similarMovies,
    isLoading: state.LoadingReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDetailsMovie: (id) => dispatch(getDetailsMovie(id)),
  getSimilarMovies: (id, page) => dispatch(getSimilarMovies(id, page)),
  getDetailsTv: (id) => dispatch(getDetailsTv(id)),
  getSimilarTv: (id, page) => dispatch(getSimilarTv(id, page)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(DetailsStyle, { withTheme: true }),
  withRouter
)(Details);
