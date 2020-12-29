import React, { Component } from "react";
import BlogCard from "./../BlogCard/BlogCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, withStyles } from "@material-ui/core";
import { TopicsStyle } from "./TopicsStyle";
import NotFound from "./../../../../utils/NotFound/NotFound";

class Topics extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getTopics();
  }
  showTopics = () =>
    this.props.topics.map((item) => (
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
    ));
  render() {
    const { classes, isLoading } = this.props;
    return isLoading ? (
      <CircularProgress />
    ) : (
      <Box className={classes.topicsBox}>
        {this.props.topics.length ? this.showTopics() : <NotFound />}
      </Box>
    );
  }
}

export default withStyles(TopicsStyle, { withTheme: true })(Topics);
