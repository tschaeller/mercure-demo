import * as React from "react";
import {useSelector} from "react-redux";
import Message from "./Message";
import {Grid} from "@mui/material";

const MessageList = props => {
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const messages = useSelector((state) => state.chat.messages[currentRoom]);

    return (
        <Grid
            container
            spacing={1}
            rowSpacing={1}
            alignItems={"end"}
            justifyContent={"center"}
            direction={"row"}
            height={"50vh"}
            overflow={"scroll"}
            alignContent={"end"}
        >
            {messages && messages.map((message) => (<Message message={message}/>))}
        </Grid>
    );
}

export default MessageList;
