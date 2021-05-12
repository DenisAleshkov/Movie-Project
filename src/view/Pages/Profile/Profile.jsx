import React, { Component } from "react";
import Panel from "../Blog/components/Profile/components/Panel/Panel";
import CircularProgressWithLabel from "./../Blog/components/Profile/components/CircularLabel/CircularLabel";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  Chip,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  withStyles,
} from "@material-ui/core";
import { setDefaultAvatar } from "./../../utils/functions";
import { getRateMovies, getRateTv } from "./../../../store/actions/movieAction";
import { connect } from "react-redux";
import { compose } from "redux";
import { ProfileStyle } from "./ProfileStyle";
import { uploadPhoto } from "../../../store/actions/authAction";

const headerUrl = "https://reactapp.ir/wp-content/uploads/reactjs.jpg";
class Profile extends Component {
  componentDidMount() {
    this.props.getRateMovies(1);
    this.props.getRateTv(1);
  }
  fileChanged = (e) => {
    if (e.target.files.length) {
      this.props.uploadPhotos({
        file: e.target.files[0],
        userId: this.props.userId,
      });
    }
  };
  showAvatar = () => {
    return this.props.isAvatarLoading ? (
      <CircularProgress
        style={{ width: "200px", height: "200px" }}
        className={this.props.classes.avatarLoading}
      />
    ) : (
      <Avatar className={this.props.classes.avatar}>
        {this.props.photoUrl ? (
          <img
            src={this.props.photoUrl}
            className={this.props.classes.profilePhoto}
          />
        ) : (
          <Typography className={this.props.classes.avatarText} variant="h1">
            {setDefaultAvatar(this.props.firstName, this.props.lastName)}
          </Typography>
        )}
      </Avatar>
    );
  };
  render() {
    const {
      classes,
      firstName,
      lastName,
      email,
      myAverageTv,
      myAverageMovies,
    } = this.props;
    return (
      <Box className={classes.profile}>
        <Box
          className={classes.header}
          style={{
            backgroundImage: `url(${headerUrl}}`,
          }}
        ></Box>
        <Box className={classes.content}>
          <Box className={classes.profileInfo}>
            {this.showAvatar()}
            <Box className={classes.uploadAvatar}>
              <input
                className={classes.uploadAvatarInput}
                id="icon-button-file"
                type="file"
                onChange={this.fileChanged}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Box className={classes.fullName}>
              <Typography className={classes.avatarText} variant="h4">
                {firstName} {lastName}
              </Typography>
            </Box>
            <Box className={classes.email}>
              <Chip
                size="small"
                avatar={
                  <Avatar> {setDefaultAvatar(firstName, lastName)}</Avatar>
                }
                label={email}
              />
            </Box>
            <Box className={classes.totalRatings}>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.listAvatar}>
                      <CircularProgressWithLabel
                        className={classes.circularLabel}
                        value={myAverageMovies * 10}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Average events rating" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <Divider variant="inset" component="li" />
              </List>
            </Box>
          </Box>
          <Box className={classes.profileNav}>
            <Panel
              rateTv={this.props.rateTv}
              rateMovies={this.props.rateMovies}
              className={classes.homePanel}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.AuthReducer.userId,
    firstName: state.AuthReducer.firstName,
    lastName: state.AuthReducer.lastName,
    photoUrl: state.AuthReducer.photoUrl,
    email: state.AuthReducer.email,
    rateMovies: state.MoviesReducer.rateMovies,
    rateTv: state.MoviesReducer.rateTv,
    myAverageMovies: state.MoviesReducer.myAverageMovies,
    myAverageTv: state.MoviesReducer.myAverageTv,
    isAvatarLoading: state.LoadingReducer.isAvatarLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRateMovies: (page) => dispatch(getRateMovies(page)),
  getRateTv: (page) => dispatch(getRateTv(page)),
  uploadPhotos: (data) => dispatch(uploadPhoto(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(ProfileStyle, { withTheme: true })
)(Profile);
