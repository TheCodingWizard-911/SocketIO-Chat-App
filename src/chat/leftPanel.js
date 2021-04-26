import { Paper } from "@material-ui/core";
import React from "react";

const LeftPanel = ({ roomname }) => {
  return <Paper elevation={5}>{roomname}</Paper>;
};

export default LeftPanel;
