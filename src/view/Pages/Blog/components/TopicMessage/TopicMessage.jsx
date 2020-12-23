import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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

const ITEM_HEIGHT = 48;

class TopicMessage extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };
  likesHandler = (e) => {
    e.target.id &&
      this.props.updateMessagesLikes(
        {
          message: e.target.id,
          topic: this.props.match.params.id,
          user: this.props.myId,
        },
        {
          type: "likes",
          likes: this.props.likes + 1,
          disLikes: this.props.disLikes,
          changed: {
            changedType: "likes",
            changedValue: this.props.likes,
            notChangedType: "disLikes",
            notChangedValue: this.props.disLikes,
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
          user: this.props.myId,
        },
        {
          type: "disLikes",
          likes: this.props.likes,
          disLikes: this.props.disLikes + 1,
          changed: {
            changedType: "disLikes",
            changedValue: this.props.disLikes,
            notChangedType: "likes",
            notChangedValue: this.props.likes,
          },
        }
      );
  };
  deleteHandler = (e) => {
    this.props.deleteMessage({
      topic: this.props.match.params.id,
      message: e.target.id,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  getOptions = () => {
    const option = [
      {
        name: "Delete",
      },
    ];
    if (this.props.myId === this.props.userId) {
      return option.map((option) => {
        return (
          <div key={this.props.id}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem id={this.props.id} onClick={this.deleteHandler}>
                {option.name}
              </MenuItem>
            </Menu>
          </div>
        );
      });
    }
  };
  showAvatar = () => {
    return (
      <Avatar>
        {this.props.photoUrl ? (
          <img
            src={this.props.photoUrl}
            className={this.props.classes.profilePhoto}
            style={{ width: 40, height: 40 }}
          />
        ) : (
          <Typography className={this.props.classes.avatarText} variant="subtitle1">
            {setDefaultAvatar(this.props.fName, this.props.lName)}
          </Typography>
        )}
      </Avatar>
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
      isMessageLoading,
    } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader
          className={classes.headerCard}
          avatar={this.showAvatar()}
          action={this.getOptions()}
          title={`reply by ${fName} ${lName},`}
          subheader={FormatDate(date.toDate())}
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
