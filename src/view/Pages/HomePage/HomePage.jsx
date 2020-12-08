import React from "react";
import Navigation from "./components/Navigation/Navigation";
import { withRouter } from "react-router-dom";
class HomePage extends React.Component {
  render() {
    return (
      <Navigation
        location={this.props.location.pathname}
        history={this.props.history}
      />
    );
  }
}

export default withRouter(HomePage);
