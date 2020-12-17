
import ChatIcon from '@material-ui/icons/Chat';
export const BLOG_ICONS = (cssClass = "") => {
    return [
      {
        component: <ChatIcon className={cssClass}/>,
        url: "/blog/profile",
      },
      {
        component: <ChatIcon className={cssClass} />,
        url: "/blog/createTopic",
      },
      {
        component: <ChatIcon className={cssClass} />,
        url: "/blog/topics",
      },
    ];
  };