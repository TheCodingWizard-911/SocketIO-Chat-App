import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const JoinChatRoom = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <img src={Logo} alt="" width={"40%"} /> */}
        <Typography component="h1" variant="h5">
          Join Room
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="Username"
          label="Username"
          name="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="Roomname"
          label="Roomname"
          type="Roomname"
          id="Roomname"
          value={roomname}
          onChange={(e) => setRoomname(e.target.value)}
        />
        <Link
          onClick={(e) => (!username || !roomname ? e.preventDefault() : null)}
          to={`/chat?username=${username}&roomname=${roomname}`}
        >
          <button type="submit">Join Room</button>
        </Link>
      </div>
    </Container>
  );
};

export default JoinChatRoom;
