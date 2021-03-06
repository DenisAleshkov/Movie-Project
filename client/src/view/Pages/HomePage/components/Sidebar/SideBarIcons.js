import Slideshow from "@material-ui/icons/Slideshow";
import Tv from "@material-ui/icons/Tv";
import Book from "@material-ui/icons/BookmarkBorder";
import Badge from "@material-ui/core/Badge";
import ChatIcon from '@material-ui/icons/Chat';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { IconButton } from "@material-ui/core";

export const NAV_ICONS = (cssClass = "", count) => {
    return [
      {
        component: <PermIdentityOutlinedIcon className={cssClass} />,
        url: "/home/profile",
      },
      {
        component: <Slideshow className={cssClass} />,
        url: "/home/movie",
      },
      {
        component: (
          <IconButton aria-label="cart" style={{padding: "12px 0"}}>
            <Badge badgeContent={count} color="secondary" showZero>
              <Book className={cssClass} />
            </Badge>
          </IconButton>
        ),
        url: "/home/library",
      },
    ];
  };