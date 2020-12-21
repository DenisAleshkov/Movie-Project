
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
export const BLOG_ICONS = (cssClass = "") => {
    return [
      {
        component: <PermIdentityOutlinedIcon className={cssClass}/>,
        url: "/blog/profile",
      },
      {
        component: <InsertDriveFileOutlinedIcon className={cssClass} />,
        url: "/blog/createTopic",
      },
      {
        component: <CommentOutlinedIcon className={cssClass} />,
        url: "/blog/topics",
      },
    ];
  };