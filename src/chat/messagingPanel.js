import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { IconButton } from "@material-ui/core";
import SendButton from "@material-ui/icons/Telegram";

import "./messagingPanel.css";
import Message from "./displayMessages";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    flexGrow: 1,
  },
  textBox: {
    bottom: 0,
    position: "sticky",
    width: "100%",
    padding: "1em",
    backgroundColor: "skyblue",
  },
  textInput: {
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
  paper: {
    height: "100vh",
    flexGrow: 1,
    overflow: "auto",
    borderRadius: 0,
  },
  textBoxPaper: {
    padding: theme.spacing(1, 2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const MessagingPanel = ({
  messages,
  username,
  setMessage,
  sendMessage,
  message,
}) => {
  const classes = useStyles();

  const displayMessage = messages.map((message, index) => (
    <Message message={message} username={username} index={index} />
  ));

  return (
    <Paper className={classes.paper} elevation={0}>
      <div className="Chat">{displayMessage}</div>
      <div className={classes.textBox}>
        <form noValidate autoComplete="off">
          {/* <div>
            <TextField
              id="outlined-textarea"
              placeholder="Enter a message"
              multiline
              variant="outlined"
              size="small"
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e);
                }
              }}
            />
          </div>
          <div>
            <IconButton
              edge="start"
              className={classes.button}
              color="inherit"
              aria-label="Back to Home Page"
              onClick={(e) => sendMessage(e)}
            >
              <SendButton />
            </IconButton>
          </div> */}
          <Paper elevation={0} className={classes.textBoxPaper}>
            <InputBase
              className={classes.input}
              placeholder="Enter a message"
              multiline
              size="small"
              inputProps={{ "aria-label": "enter message to send" }}
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e);
                }
              }}
            />
            <IconButton
              edge="start"
              className={classes.button}
              color="inherit"
              aria-label="Back to Home Page"
              onClick={(e) => sendMessage(e)}
            >
              <SendButton />
            </IconButton>
          </Paper>
        </form>
      </div>
    </Paper>
  );
};

export default MessagingPanel;
