import React from "react";
import { CircularProgress, Typography, Box } from "@material-ui/core";

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex" style={{ height: 40 }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;