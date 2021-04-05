import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import { BlogCardStyle } from "./BlogCardStyle";
import { Link } from "react-router-dom";
import { FormatDate } from "./../../../../utils/functions";

class BlogCard extends React.Component {
  render() {
    const { classes, title, id, fName, lName, lastMessageDate } = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom component="h6">
              Last reply by {`${fName} ${lName}`},{" "}
              {FormatDate(lastMessageDate.toDate())}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            component={Link}
            to={`/blog/topic/${id}`}
            size="small"
            color="primary"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(BlogCardStyle, { withTheme: true })(BlogCard);
