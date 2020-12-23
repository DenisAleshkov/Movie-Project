import React, { Component } from "react";
import firebase from "firebase";
import clsx from "clsx";
import CreateTopic from "./components/CreateTopic/CreateTopic";
import Profile from "./components/Profile/Profile";
import Topics from "./components/Topics/Topics";
import TopicPage from "./components/TopicPage/TopicPage";
import {
  LinearProgress,
  Drawer,
  CssBaseline,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  createTopic,
  getTopics,
  getTopicInfo,
  sendMessage,
  getMessages,
  updateLikesInHeader,
  updateMessagesLikes,
  deleteMessage,
  setNotification,
} from "./../../../store/actions/blogAction";
import { getRateMovies, getRateTv } from "../../../store/actions/movieAction";
import { setDefaultAvatar } from "./../../utils/functions";
import { Route, Switch, Link } from "react-router-dom";
import { BLOG_ICONS } from "./BlogIcons";
import { BlogStyle } from "./BlogStyle";
import { compose } from "redux";
import { connect } from "react-redux";
import { setUser, updatePhoto } from "./../../../store/actions/authAction";

class Blog extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.props.setUser({ ...doc.data(), id: doc.id });
          });
      }
    });
  }
  showLoading = () => {
    if (this.props.isMessageLoading) {
      return <LinearProgress className={this.props.classes.loader} />;
    }
  };
  showAvatar = (styles) => {
    const { width, height, margin } = styles;
    return (
      <Avatar style={{ width: width, height: height, marginTop: margin }}>
        {this.props.photoUrl ? (
          <img
            src={this.props.photoUrl}
            className={this.props.classes.profilePhoto}
            style={{ width: width, height: height }}
          />
        ) : (
          <Typography className={this.props.classes.avatarText} variant="h3">
            {setDefaultAvatar(this.props.firstName, this.props.lastName)}
          </Typography>
        )}
      </Avatar>
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <Box className={classes.avatarBox}>
            {this.showAvatar({ width: "100px", height: "100px", margin: 0 })}
          </Box>

          <List>
            {["Profile", "Create topic", "Topics", "Back"].map(
              (text, index) => (
                <ListItem
                  button
                  component={Link}
                  to={BLOG_ICONS()[index].url}
                  key={text}
                  className={classes.sideMenuSelected}
                >
                  <ListItemIcon>
                    {BLOG_ICONS(clsx(classes.navIcon))[index].component}
                  </ListItemIcon>
                  <ListItemText
                    className={clsx(classes.navIconText)}
                    primary={text}
                  />
                </ListItem>
              )
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          {this.showLoading()}
          <Switch>
            <Route path="/blog/createTopic" exact>
              <CreateTopic
                className={classes.createTopic}
                createTopic={this.props.createTopic}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                id={this.props.userId}
                setNotification={this.props.setNotification}
                notification={this.props.notification}
                isNotificationLoading={this.props.isNotificationLoading}
              />
            </Route>
            <Route path="/blog" exact>
              <Topics
                className={classes.topics}
                topics={this.props.topics}
                getTopics={this.props.getTopics}
              />
            </Route>
            <Route path="/blog/topics" exact>
              <Topics
                className={classes.topics}
                topics={this.props.topics}
                getTopics={this.props.getTopics}
                isLoading={this.props.isLoading}
              />
            </Route>
            <Route path="/blog/topic/:id" exact>
              <TopicPage
                className={classes.topics}
                topicInfo={this.props.topicInfo}
                getTopicInfo={this.props.getTopicInfo}
                isLoading={this.props.isLoading}
                sendMessage={this.props.sendMessage}
                getMessages={this.props.getMessages}
                userId={this.props.userId}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                messages={this.props.messages}
                updateLikesInHeader={this.props.updateLikesInHeader}
                updateMessagesLikes={this.props.updateMessagesLikes}
                isMessageLoading={this.props.isMessageLoading}
                deleteMessage={this.props.deleteMessage}
                showAvatar={this.showAvatar}
                updatePhoto={this.props.updatePhoto}
              />
            </Route>
            <Route path="/blog/profile" exact>
              <Profile
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                photoUrl={this.props.photoUrl}
                email={this.props.email}
                getRatedMovies={this.props.getRatedMovies}
                getRateTv={this.props.getRateTv}
                rateMovies={this.props.rateMovies}
                rateTv={this.props.rateTv}
                myAverageMovies={this.props.myAverageMovies}
                myAverageTv={this.props.myAverageTv}
                showAvatar={this.showAvatar}
              />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.AuthReducer.userId,
    email: state.AuthReducer.email,
    firstName: state.AuthReducer.firstName,
    lastName: state.AuthReducer.lastName,
    photoUrl: state.AuthReducer.photoUrl,
    topics: state.BlogReducer.topics,
    topicInfo: state.BlogReducer.topicInfo,
    isLoading: state.LoadingReducer.isLoading,
    isNotificationLoading: state.LoadingReducer.isNotificationLoading,
    isMessageLoading: state.LoadingReducer.isMessageLoading,
    messages: state.BlogReducer.messages,
    notification: state.BlogReducer.notification,
    rateMovies: state.MoviesReducer.rateMovies,
    rateTv: state.MoviesReducer.rateTv,
    myAverageMovies: state.MoviesReducer.myAverageMovies,
    myAverageTv: state.MoviesReducer.myAverageTv,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch(setUser(data)),
  createTopic: (data, credentials) => dispatch(createTopic(data, credentials)),
  getTopics: () => dispatch(getTopics()),
  getTopicInfo: (id) => dispatch(getTopicInfo(id)),
  sendMessage: (userId, id, data) => dispatch(sendMessage(userId, id, data)),
  getMessages: (id) => dispatch(getMessages(id)),
  updateLikesInHeader: (ID, data) => dispatch(updateLikesInHeader(ID, data)),
  updateMessagesLikes: (ID, data) => dispatch(updateMessagesLikes(ID, data)),
  deleteMessage: (ID) => dispatch(deleteMessage(ID)),
  setNotification: (payload) => dispatch(setNotification(payload)),
  getRatedMovies: (page) => dispatch(getRateMovies(page)),
  getRateTv: (page) => dispatch(getRateTv(page)),
  updatePhoto: (ID, photoUrl) => dispatch(updatePhoto(ID, photoUrl)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(BlogStyle, { withTheme: true })
)(Blog);
