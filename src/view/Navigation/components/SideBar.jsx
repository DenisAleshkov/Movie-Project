import React from "react";
import clsx from "clsx";
import { NAV_ICONS } from "./../../../store/constants";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const SideBar = ({ classes }) => (
  <List>
    {["Movies", "TV Shows"].map((text, index) => (
      <ListItem button component={Link} to={NAV_ICONS()[index].url} key={text}>
        <ListItemIcon>
          {NAV_ICONS(clsx(classes.navIcon))[index].component}
        </ListItemIcon>
        <ListItemText className={clsx(classes.navIconText)} primary={text} />
      </ListItem>
    ))}
  </List>
);

export default SideBar;
