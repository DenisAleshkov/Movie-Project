import React, { Component } from "react";
import TopicMessage from "./../TopicMessage/TopicMessage";
import {
  Card,
  Box,
  Button,
  withStyles,
  Badge,
  CardHeader,
  Breadcrumbs,
  TextField,
  Typography,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  LinearProgress,
} from "@material-ui/core";

import { TopicPageStyle } from "./TopicPageStyle";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import { Link, Redirect, withRouter } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { compose } from "redux";
import { setDefaultAvatar, FormatDate } from "./../../../../utils/functions";

class TopicPage extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
  }
  componentDidMount() {
    const userId = localStorage.getItem("token");
    this.props.updatePhoto(
      { topic: this.props.match.params.id, userId: userId },
      this.props.photoUrl
    );
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.props.userId, this.props.match.params.id, {
      ...this.state,
      fName: this.props.firstName,
      lName: this.props.lastName,
    });
  };
  likesHandler = (e) => {
    if (e.target.id) {
      this.props.updateLikesInHeader(
        {
          topic: this.props.match.params.id,
          user: this.props.userId,
        },
        {
          type: "likes",
          likes: this.props.topicInfo.likes + 1,
          disLikes: this.props.topicInfo.disLikes,
          changed: {
            changedType: "likes",
            changedValue: this.props.topicInfo.likes,
            notChangedType: "disLikes",
            notChangedValue: this.props.topicInfo.disLikes,
          },
        }
      );
    }
  };
  disLikesHandler = (e) => {
    if (e.target.id) {
      this.props.updateLikesInHeader(
        {
          topic: this.props.match.params.id,
          user: this.props.userId,
        },
        {
          type: "disLikes",
          likes: this.props.topicInfo.likes,
          disLikes: this.props.topicInfo.disLikes + 1,
          changed: {
            changedType: "disLikes",
            changedValue: this.props.topicInfo.disLikes,
            notChangedType: "likes",
            notChangedValue: this.props.topicInfo.likes,
          },
        }
      );
    }
  };
  showMessages = () => {
    return this.props.messages.map((item) => {
      return (
        <TopicMessage
          key={item.id}
          userId={item.userId}
          myId={this.props.userId}
          fName={item.fName}
          lName={item.lName}
          message={item.message}
          likes={item.likes}
          disLikes={item.disLikes}
          id={item.id}
          date={item.date}
          updateMessagesLikes={this.props.updateMessagesLikes}
          isMessageLoading={this.props.isMessageLoading}
          deleteMessage={this.props.deleteMessage}
          photoUrl={item.photoUrl}
        />
      );
    });
  };
  showAvatar = () => {
    const { photoUrl, fName, lName } = this.props.topicInfo;
    return (
      <Avatar>
        {photoUrl ? (
          <img src={photoUrl} style={{ width: 40, height: 40 }} />
        ) : (
          <Typography
            className={this.props.classes.avatarText}
            variant="subtitle1"
          >
            {setDefaultAvatar(fName, lName)}
          </Typography>
        )}
      </Avatar>
    );
  };
  render() {
    const { classes, topicInfo, isLoading, isMessageLoading } = this.props;
    if (isLoading || topicInfo === null) return <LinearProgress />;
    return (
      <Box className={classes.topicPage}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/blog">Blog</Link>
          <Link to="/blog/topics">Topics</Link>
          <Typography color="textPrimary">{topicInfo.title}</Typography>
        </Breadcrumbs>
        <Card className={classes.root}>
          <CardHeader
            className={classes.headerCard}
            avatar={this.showAvatar()}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={topicInfo.title}
            subheader={`published by ${topicInfo.fName} ${
              topicInfo.lName
            }, ${FormatDate(topicInfo.dateTime.toDate())}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {topicInfo.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.footerCard} disableSpacing>
            <IconButton
              className={classes.footerAction}
              aria-label="add to favorites"
              id={topicInfo.topicId}
              onClick={(e) => this.likesHandler(e)}
              disabled={isMessageLoading}
            >
              <Badge
                color="secondary"
                badgeContent={topicInfo.likes}
                className={classes.stylesBadge}
                showZero
                id={topicInfo.topicId}
              >
                <ThumbUpAltOutlinedIcon
                  className={classes.iconBtnwithBudge}
                  id={topicInfo.topicId}
                />
              </Badge>
            </IconButton>

            <IconButton
              className={classes.footerAction}
              aria-label="add to favorites"
              id={topicInfo.topicId}
              onClick={(e) => this.disLikesHandler(e)}
              disabled={isMessageLoading}
            >
              <Badge
                color="secondary"
                className={classes.stylesBadge}
                badgeContent={topicInfo.disLikes}
                style={{ padding: 7 }}
                showZero
                id={topicInfo.topicId}
              >
                <ThumbDownAltOutlinedIcon
                  className={classes.iconBtnwithBudge}
                  id={topicInfo.topicId}
                />
              </Badge>
            </IconButton>
          </CardActions>
        </Card>
        <Box className={classes.messagesBox}>
          <Box className={classes.messages}>{this.showMessages()}</Box>
          <Box className={classes.btnBox}>
            <form className={classes.formSubmit} onSubmit={this.handleSubmit}>
              <TextField
                id="message"
                label="Enter message..."
                multiline
                rows={4}
                variant="outlined"
                className={classes.replyTextarea}
                onChange={this.changeHandler}
              />
              <Button
                className={classes.replyBtn}
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Send
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default compose(
  withStyles(TopicPageStyle, { withTheme: true }),
  withRouter
)(TopicPage);
