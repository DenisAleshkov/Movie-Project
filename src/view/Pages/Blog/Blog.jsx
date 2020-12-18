import React, { Component } from "react";
import firebase from "firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Avatar, Box, withStyles } from "@material-ui/core";
import { BlogStyle } from "./BlogStyle";
import { compose } from "redux";
import { connect } from "react-redux";
import { setUser } from "./../../../store/actions/authAction";
import {
  createTopic,
  getTopics,
  getTopicInfo,
  sendMessage,
  getMessages,
  updateLikesInHeader,
  updateMessagesLikes,
} from "./../../../store/actions/blogAction";
import { setDefaultAvatar } from "./../../utils/functions";
import { Route, Switch, Link } from "react-router-dom";
import CreateTopic from "./components/CreateTopic/CreateTopic";
import { BLOG_ICONS } from "./BlogIcons";
import Topics from "./components/Topics/Topics";
import TopicPage from "./components/TopicPage/TopicPage";

class Blog extends Component {
  componentDidMount() {
    this.props.getTopics();
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
            <Avatar className={classes.avatar}>
              {setDefaultAvatar(this.props.firstName, this.props.lastName)}
            </Avatar>
          </Box>

          <List>
            {["Profile", "Create topic", "Topics"].map((text, index) => (
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
            ))}
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
    firstName: state.AuthReducer.firstName,
    lastName: state.AuthReducer.lastName,
    topics: state.BlogReducer.topics,
    topicInfo: state.BlogReducer.topicInfo,
    isLoading: state.LoadingReducer.isLoading,
    isMessageLoading: state.LoadingReducer.isMessageLoading,
    messages: state.BlogReducer.messages,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch(setUser(data)),
  createTopic: (data, credentials) => dispatch(createTopic(data, credentials)),
  getTopics: () => dispatch(getTopics()),
  getTopicInfo: (id) => dispatch(getTopicInfo(id)),
  sendMessage: (id, data) => dispatch(sendMessage(id, data)),
  getMessages: (id) => dispatch(getMessages(id)),
  updateLikesInHeader: (userId, id, data) =>
    dispatch(updateLikesInHeader(userId, id, data)),
  updateMessagesLikes: (ID, data) => dispatch(updateMessagesLikes(ID, data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(BlogStyle, { withTheme: true })
)(Blog);
