import React, { Component } from "react";
import BlogCard from "./../BlogCard/BlogCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, withStyles } from "@material-ui/core";
import { TopicsStyle } from "./TopicsStyle";

class Topics extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getTopics();
  }
  showTopics = () => {
    return (
      this.props.topics &&
      this.props.topics.map((item) => {
        return (
          <BlogCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            lastMessageDate={item.lastMessage}
            fName={item.MessageFName}
            lName={item.MessageLName}
            lastMessageDate={item.lastMessageDate}
          />
        );
      })
    );
  };
  render() {
    const { classes, isLoading } = this.props;
    return isLoading ? (
      <CircularProgress />
    ) : (
      <Box className={classes.topicsBox}>{this.showTopics()}</Box>
    );
  }
}

export default withStyles(TopicsStyle, { withTheme: true })(Topics);
