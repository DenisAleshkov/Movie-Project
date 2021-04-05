import React, { Component } from "react";
import Panel from "./components/Panel/Panel";
import CircularProgressWithLabel from "./components/CircularLabel/CircularLabel";
import {
  Typography,
  Chip,
  withStyles,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
} from "@material-ui/core";
import { ProfileStyle } from "./ProfileStyle";
import { setDefaultAvatar } from "./../../../../utils/functions";
const headerUrl = "https://reactapp.ir/wp-content/uploads/reactjs.jpg";
class Profile extends Component {
  componentDidMount() {
    this.props.getRatedMovies(1);
    this.props.getRateTv(1);
  }
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
            {this.props.showAvatar({
              width: "200px",
              height: "200px",
              margin: "-140px",
            })}
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
              <Typography className={classes.avatarText} variant="h5">
                Total ratings:{" "}
                {this.props.rateTv.length + this.props.rateMovies.length}
              </Typography>
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
                  <ListItemText primary="Average movie rating" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.listAvatar}>
                      <CircularProgressWithLabel
                        className={classes.circularLabel}
                        value={myAverageTv * 10}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary=" Average tv rating" />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </Box>
          </Box>
          <Box className={classes.profileNav}>
            <Panel
              rateTv={this.props.rateTv}
              rateMovies={this.props.rateMovies}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}
export default withStyles(ProfileStyle, { withTheme: true })(Profile);
