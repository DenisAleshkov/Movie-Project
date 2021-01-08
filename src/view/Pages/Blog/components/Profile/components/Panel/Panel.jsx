import React from "react";
import RatedCard from "./../RatedCard/RatedCard";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { PanelStyle } from "./PanelStyle";
import { withStyles } from "@material-ui/core";

class Panel extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };
  showRatedMovie = () =>
    this.props.rateMovies.map((item) => (
      <RatedCard
        key={item.id}
        poster={item.poster_path}
        title={item.title}
        rating={item.rating}
      />
    ));
  showRatedTv = () =>
    this.props.rateTv.map((item) => (
      <RatedCard
        key={item.id}
        poster={item.poster_path}
        name={item.name}
        rating={item.rating}
      />
    ));

  render() {
    const { classes } = this.props;
    return (
      <>
        <AppBar position="static" color="default" className={classes.rateNav}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            variant="fullWidth"
          >
            <Tab label="Rated Movies" {...a11yProps(0)} />
            <Tab label="Rated Tv" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          {this.showRatedMovie()}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          {this.showRatedTv()}
        </TabPanel>
      </>
    );
  }
}
const a11yProps = (index) => ({
  id: `scrollable-auto-tab-${index}`,
  "aria-controls": `scrollable-auto-tabpanel-${index}`,
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{
        overflowY: "auto",
        height: 500,
      }}
    >
      {value === index && (
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};
export default withStyles(PanelStyle, { withTheme: true })(Panel);
