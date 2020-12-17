import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { CreateTopicStyle } from "./CreateTopicStyle";

class CreateTopic extends Component {
  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.props.createTopic(this.state, {
      userId: this.props.id,
      fName: this.props.firstName,
      lName: this.props.lastName,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.createTopic}
        noValidate
        autoComplete="off"
        onSubmit={this.submitHandler}
      >
        <Typography variant="h3" component="h2" gutterBottom>
          CreateTopic
        </Typography>
        <div>
          <TextField
            id="title"
            label="Title"
            style={{ margin: 8 }}
            placeholder="Enter title"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.changeHandler}
          />
        </div>
        <div>
          <TextField
            id="description"
            label="Title"
            multiline
            rows={4}
            placeholder="Enter descrtiption"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={this.changeHandler}
          />
        </div>
        <div className={classes.createBtnBox}>
          <Button
            className={classes.createBtn}
            onClick={this.submitHandler}
            variant="outlined"
          >
            Create
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(CreateTopicStyle, { withTheme: true })(CreateTopic);
