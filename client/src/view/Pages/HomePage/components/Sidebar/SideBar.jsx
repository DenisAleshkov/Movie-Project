import React from "react";
import clsx from "clsx";
import { NAV_ICONS } from "./SideBarIcons";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const SideBar = ({ classes, location, count }) => {
  return (
    <List>
      {["Profile", "Events", "My Library"].map((text, index) => (
        <ListItem
          button
          component={Link}
          to={NAV_ICONS()[index].url}
          key={text}
          className={classes.sideMenuSelected}
          selected={location === NAV_ICONS()[index].url}
        >
          <ListItemIcon>
            {NAV_ICONS(clsx(classes.navIcon), count)[index].component}
          </ListItemIcon>
          <ListItemText className={clsx(classes.navIconText)} primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

export default SideBar;
