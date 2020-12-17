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
import { Box, Button, withStyles,Badge } from "@material-ui/core";
import { TopicPageStyle } from "./TopicPageStyle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { setDefaultAvatar } from "./../../../../utils/functions";

class TopicPage extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
  }
  componentDidMount() {
    this.props.getTopicInfo(this.props.match.params.id);
    this.props.getMessages(this.props.match.params.id);
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.props.match.params.id, {
      ...this.state,
      fName: this.props.firstName,
      lName: this.props.lastName,
    });
  };
  handleClick = (e) => {
      console.log('e', e.target.id)

  }
  showMessages = () => {
    return this.props.messages.map((item) => {
        console.log('item', )
      return (
        <Card
          className={this.props.classes.root}
          key={item.id}
          style={{ marginBottom: 30 }}
        >
          <CardHeader
            className={this.props.classes.headerCard}
            avatar={
              <Avatar aria-label="recipe" className={this.props.classes.avatar}>
                {setDefaultAvatar(item.fName, item.lName)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`Answer from ${item.fName} ${item.lName}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.message}
            </Typography>
          </CardContent>
          <CardActions className={this.props.classes.footerCard} disableSpacing>
            <Badge color="secondary" badgeContent={5}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon/>
              </IconButton>
            </Badge>
          </CardActions>
        </Card>
      );
    });
  };
  render() {
    const { classes, topicInfo, isLoading } = this.props;
    if (isLoading || topicInfo === null) return <CircularProgress />;
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
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {setDefaultAvatar(topicInfo.fName, topicInfo.lName)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={topicInfo.title}
            subheader={`published by ${topicInfo.fName} ${topicInfo.lName}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {topicInfo.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.footerCard} disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
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
