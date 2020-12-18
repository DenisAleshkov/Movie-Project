import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box, Button, withStyles, Badge } from "@material-ui/core";
import { TopicMessageStyle } from "./TopicMessageStyle";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { setDefaultAvatar, FormatDate } from "./../../../../utils/functions";

class TopicMessage extends Component {
  likesHandler = (e) => {
    console.log('e', e.target.type)
    e.target.id &&
      this.props.updateMessagesLikes(
        {
          message: e.target.id,
          topic: this.props.match.params.id,
          user: this.props.userId,
        },
        {
          likes: this.props.likes + 1,
          disLikes: this.props.disLikes,
          changed: {
            typeForDelete: "likes",
            changedType: "likes",
            changedvalue:this.props.disLikes,
            notChangedType: "disLikes",
            notChangedValue:  this.props.likes,
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
          likes: this.props.likes,
          disLikes: this.props.disLikes + 1,
          changed: {
            typeForDelete: "disLikes",
            changedType: "disLikes",
            changedvalue:  this.props.likes,
            notChangedType: "likes",
            notChangedValue:this.props.disLikes,
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
            onClick={(e) => this.disLikesHandler(e)}
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
