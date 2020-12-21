import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles, Badge } from "@material-ui/core";
import { TopicMessageStyle } from "./TopicMessageStyle";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { setDefaultAvatar, FormatDate } from "./../../../../utils/functions";

class TopicMessage extends Component {
  likesHandler = (e) => {
    e.target.id &&
      this.props.updateMessagesLikes(
        {
          message: e.target.id,
          topic: this.props.match.params.id,
          user: this.props.userId,
        },
        {
          type: "likes",
          likes: this.props.likes + 1,
          disLikes: this.props.disLikes,
          changed: {
            changedType: "likes",
            changedValue:this.props.likes,
            notChangedType: "disLikes",
            notChangedValue:  this.props.disLikes,
          },
        }
      );
  };
  disLikesHandler = (e) => {
    e.target.id &&
      this.props.updateMessagesLikes(
        {
         
          message: e.target.id,
          topic: this.props.match.params.id,
          user: this.props.userId,
        },
        {
          type: "disLikes",
          likes: this.props.likes,
          disLikes: this.props.disLikes + 1,
          changed: {
            changedType: "disLikes",
            changedValue:  this.props.disLikes,
            notChangedType: "likes",
            notChangedValue:this.props.likes,
          },
        }
      );
  };
  render() {
    const {
      classes,
      fName,
      lName,
      message,
      likes,
      disLikes,
      id,
      date,
      isMessageLoading

    } = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader
          className={classes.headerCard}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {setDefaultAvatar(fName, lName)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`reply by ${fName} ${lName}`}
          subheader={"FormatDate(date.toDate())"}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {message}
          </Typography>
        </CardContent>
        <CardActions className={classes.footerCard} disableSpacing>
          <IconButton
            className={classes.footerAction}
            aria-label="add to favorites"
            id={id}
            onClick={(e) => this.likesHandler(e)}
            disabled={isMessageLoading}
          >
            <Badge
              color="secondary"
              badgeContent={likes}
              type="likes"
              className={classes.stylesBadge}
              showZero
              id={id}
            >
              <ThumbUpAltOutlinedIcon
                className={classes.iconBtnwithBudge}
                id={id}
              />
            </Badge>
          </IconButton>

          <IconButton
            className={classes.footerAction}
            aria-label="add to favorites"
            id={id}
            type="dislike"
            onClick={(e) => this.disLikesHandler(e)}
            disabled={isMessageLoading}
          >
            <Badge
              color="secondary"
              className={classes.stylesBadge}
              badgeContent={disLikes}
              style={{ padding: 7 }}
              showZero
              id={id}
            >
              <ThumbDownAltOutlinedIcon
                className={classes.iconBtnwithBudge}
                id={id}
              />
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default compose(
  withStyles(TopicMessageStyle, { withTheme: true }),
  withRouter
)(TopicMessage);
