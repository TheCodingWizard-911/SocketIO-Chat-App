import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  Me: {
    justifyContent: "flex-end",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      maxWidth: "70%",
      margin: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      backgroundColor: "green",
      borderRadius: "24px 0 24px 24px",
      color: "white",
    },
  },

  You: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      maxWidth: "70%",
      margin: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      backgroundColor: "blue",
      borderRadius: "0 24px 24px 24px",
      color: "white",
    },
  },
}));

const Message = ({ message: { text, user }, username }, index) => {
  const classes = useStyles();

  let isSentByCurrentUser = false;

  const trimmedName = username.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div className={classes.root} key={index}>
      {!isSentByCurrentUser ? (
        <div key={index++} className={classes.Me}>
          <Paper elevation={5}>{text}</Paper>
        </div>
      ) : (
        <div key={index++} className={classes.You}>
          <Paper elevation={5}>{text}</Paper>
        </div>
      )}
    </div>
  );
};

export default Message;
