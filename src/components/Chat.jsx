import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import "./styleComponents.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));



const Chat = () => {
  const classes = useStyles();
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  const sendMessage = async (e) => {
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setValue("");
  };

  const chatContainer = React.createRef();
  const scrollToMyRef = () => {
    const scroll =
      chatContainer.current.scrollHeight -
      chatContainer.current.clientHeight;
      chatContainer.current.scrollTo(0, scroll);
  };

  if (loading) {
    return <Loader />;
  }

  const disabledClick = (e) => {
    e.preventDefault();
  }

  const onClicks = (e) => {
    e.preventDefault()
    scrollToMyRef()
    sendMessage()
  }

  return (
    <Container>
      <Grid
        container
        justify={"center"}
        style={{ height: window.innerHeight - 50, marginTop: 20 }}
      >
        <div className="block-messages" ref={chatContainer}>
          {messages.map((message, id) => (
            <div
              key={id}
              className="messages"
              style={{
                border:
                  user.uid === message.uid
                    ? "2px solid #ab000d"
                    : "2px dashed red",
                background: user.uid === message.uid ? "#e53935" : "#ff6f60",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                width: "fit-content",
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          style={{ width: "100%" }}
        >
          <form onSubmit={disabledClick}>
            <TextField
              rowsMax={2}
              variant={"outlined"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mess-input"
              style={{ marginBottom: 15 }}
            />

            {value !== "" ? (
              <Button
                type="submit"
                onClick={onClicks}
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
              >
                Отправить
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                className={classes.button}
                endIcon={<Icon>send</Icon>}
              >
                Отправить
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
