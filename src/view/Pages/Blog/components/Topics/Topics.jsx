import React, { Component } from "react";
import BlogCard from "./../BlogCard/BlogCard";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Box, withStyles } from "@material-ui/core";
import { TopicsStyle } from "./TopicsStyle";

class Topics extends Component {
  constructor() {
    super();
    this.state = {};
  }
  showTopics = () => {
    return this.props.topics.map((item) => {
      console.log('item', item)
      return (
        <BlogCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
          lastMessageDate={ item.lastMessage}
          fName={item.MessageFName}
          lName={item.MessageLName}
        />
      );
    });
  };
  render() {
    const { classes } = this.props;
    return <Box className={classes.topicsBox}>{this.showTopics()}</Box>;
  }
}

export default withStyles(TopicsStyle, { withTheme: true })(Topics);
