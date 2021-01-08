import React, { Component } from "react";
import clsx from "clsx";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Box,
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { BLOG_ICONS } from "./BlogIcons";

class Sidebar extends Component {
  render() {
    const { classes, location, showAvatar } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Box className={classes.avatarBox}>
          {showAvatar({ width: "100px", height: "100px", margin: 0 })}
        </Box>
        <List>
          {["Profile", "Create topic", "Topics", "Back"].map((text, index) => (
            <ListItem
              button
              component={Link}
              to={BLOG_ICONS()[index].url}
              key={text}
              className={classes.sideMenuSelected}
              selected={location.pathname === BLOG_ICONS()[index].url}
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
    );
  }
}
export default withRouter(Sidebar);
