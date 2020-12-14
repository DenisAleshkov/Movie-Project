import React, { Component } from "react";
import { Rating } from "@material-ui/lab";
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Typography,
  withStyles,
  CircularProgress,
  Avatar,
  Link,
} from "@material-ui/core";
import DetailsStyle from "./DetailsStyle.css";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getDetailsMovie,
  getDetailsTv,
  getSimilarMovies,
  getSimilarTv,
} from "../../../store/actions/detailsAction";

class Details extends Component {
  componentDidMount() {
    this.props.getDetailsMovie(this.props.match.params.id);
    this.props.getSimilarMovies(this.props.match.params.id, 1);
  }
  handleRateChange = (event, value) => {
    console.log("event", event);
  };
  render() {
    const { classes, details } = this.props;
    return (
      <Box className="root">
        <Box className="box">
          <Box
            className="titleWrapper"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${details.backdrop_path}`,
            }}
          >
            <CardMedia
              image={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              title="Paella dish"
              style={{ width: 450, height: "100%" }}
            />
            <Box className="title">
              <Box className="leftTitle">
                <Typography className="titleText" variant="h2" gutterBottom>
                  {details.title}
                  <span className="year">
                    ({new Date(details.release_date).getFullYear()})
                  </span>
                </Typography>
                <Typography variant="h7" gutterBottom>
                    Homepage:<Link href={`${details.homepage}`}>Link</Link>
                </Typography>
              
                <Avatar>{details.vote_average}</Avatar>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating
                    name="customized-10"
                    defaultValue={details.vote_average}
                    precision={0.5}
                    max={10}
                    onChange={this.handleRateChange}
                  />
                </Box>
                <Box className="description">
                  <Box className="column2">
                    <Typography variant="h4" gutterBottom>
                      Overview
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                      {details.overview}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state.DetailsReducer.details);
  return {
    details: state.DetailsReducer.details,
    similarMovies: state.DetailsReducer.similarMovies,
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
  withStyles(DetailsStyle, { withTheme: true })
)(Details);
