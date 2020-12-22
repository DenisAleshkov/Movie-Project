import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BlogCardStyle } from "./BlogCardStyle";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormatDate } from "./../../../../utils/functions"

class BlogCard extends React.Component {
  render() {
    const { classes, title, id, fName, lName, lastMessageDate} = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>

            <Typography gutterBottom component="h6">
              Last reply by {`${fName} ${lName}`}, {FormatDate(lastMessageDate.toDate())}
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
