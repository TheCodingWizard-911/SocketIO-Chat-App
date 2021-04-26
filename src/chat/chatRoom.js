import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import queryString from "query-string";
import io from "socket.io-client";
import { Grid } from "@material-ui/core";
import LeftPanel from "./leftPanel";
import MessagingPanel from "./messagingPanel";

const BackendENDPOINT = "localhost:4000";

let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const ChatRoom = ({ location }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { username, roomname } = queryString.parse(location.search);

    socket = io(BackendENDPOINT);

    setUsername(username);
    setRoomname(roomname);

    socket.emit("join", { username, roomname }, (error, user) => {
      if (error) {
        alert(error);
      }
      if (user) {
        console.log(user);
      }
    });

    console.log(socket);
  }, [BackendENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item className={classes.leftPanel} xs={3}>
          <LeftPanel roomname={roomname} />
        </Grid>
        <Grid item className={classes.messaging} xs={9}>
          <MessagingPanel
            messages={messages}
            username={username}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChatRoom;
