import * as React from "react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {usePostMessageMutation} from "../../redux/api/chatApi";
import MessageList from "./MessageList";
import {Button, Grid, TextField} from "@mui/material";

const Room = () => {
    const userState = useSelector((state) => state.user.user);
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const [messageValue, setMessageValue] = useState("");
    const [postMessage] = usePostMessageMutation();

    // Reset the text input when you switch room
    useEffect(() => {
        setMessageValue("")
    }, [currentRoom]);

    const onMessageSendClick = () => {
        if (messageValue !== "") {
            postMessage({message: messageValue, topic: currentRoom, from: userState})
            setMessageValue("")
        }
    }

    const onKeyDown = (event) => {
        if (event.code === "Enter") {
            onMessageSendClick();
        }
    }

    return (
        <Grid container spacing={1} marginTop={"2em"} justifyContent={"center"}>
            <Grid
                container xs={8}
                justifyContent={"center"}
            >
                <MessageList/>

                <Grid
                    item
                    xs={7}
                >
                    <TextField
                        sx={{width: "90%", float: "right"}}
                        label={"Message"}
                        variant={"standard"}
                        value={messageValue}
                        onChange={(event) => setMessageValue(event.target.value)}
                        onKeyDown={onKeyDown}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        type={"submit"}
                        sx={{width: "70%", marginTop: "1em", marginLeft: "1em"}}
                        variant={"contained"}
                        onClick={onMessageSendClick}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Room;
