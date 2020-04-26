import React from "react";
import { CircularProgress, Paper } from "@material-ui/core";

const Loader = () => {
  return (
    <Paper
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#ffffff",
        opacity: 10,
        zIndex: 9999,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
      }}
    >
      <CircularProgress
        style={{
          width: "30px",
          height: "30px",
          color: "#21314d",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
        }}
      />
    </Paper>
  );
};

export default Loader;
