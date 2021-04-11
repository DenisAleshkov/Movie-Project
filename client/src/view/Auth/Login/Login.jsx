import React from "react";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LinearProgress from "@material-ui/core/LinearProgress";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  withStyles,
  Typography,
  Container,
  Snackbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { LoginStyles } from "./LoginStyles";
import { login, loginError } from "./../../../store/actions/authAction";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required, email } from "./../../utils/validate";

function AlertField(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const renderEmailField = ({ input, meta: { touched, error, warning } }) => {
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        {...input}
      />
      {touched && error && <AlertField severity="error">{error}</AlertField>}
    </>
  );
};

const renderPasswordField = ({ input, meta: { touched, error, warning } }) => {
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...input}
      />
      {touched && error && <AlertField severity="error">{error}</AlertField>}
    </>
  );
};

const renderCheckboxField = ({ input: { value, checked, onChange } }) => {
  return (
    <FormControlLabel
      control={<Checkbox value={checked} color="primary" />}
      label="Remember me"
      onChange={() => onChange(!checked)}
    />
  );
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      checked: false,
      open: false,
    };
  }
  showLoading = () => {
    if (this.props.isLoading) {
      return <LinearProgress className={this.props.classes.authLoading} />;
    }
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false,
    });
    this.props.loginError(null);
  };
  showNotification = () => {
    if (this.props.error) {
      return (
        <Snackbar
          open={!!this.props.error}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert severity="error">{this.props.error}</Alert>
        </Snackbar>
      );
    }
  };

  submit = (values) => {
    return this.props.login(values);
  };

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        {this.showLoading()}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(this.submit)}
            noValidate
          >
            <Field
              name="email"
              component={renderEmailField}
              validate={[required, email]}
            />
            <Field
              name="password"
              component={renderPasswordField}
              validate={required}
            />
            <Field
              name="checked"
              id="checked"
              component={renderCheckboxField}
              type="checkbox"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={pristine || submitting}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/auth/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {this.showNotification()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.AuthReducer.error,
  isLoading: state.LoadingReducer.isLoading,
});
const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials)),
  loginError: (payload) => dispatch(loginError(payload)),
});

export default compose(
  withStyles(LoginStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "login",
  })
)(Login);
