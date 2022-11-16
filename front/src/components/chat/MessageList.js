import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import Message from "./Message";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useGetMessagesQuery} from "../../redux/api/chatApi";
import {useEffect} from "react";
import {initMessages} from "../../redux/slices/chatSlice";

const MessageList = props => {
    const dispatch = useDispatch();
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const {data, isLoading} = useGetMessagesQuery(currentRoom);
    const messages = useSelector((state) => state.chat.messages[currentRoom]);

    useEffect(() => {
        if (data && data.messages) {
            console.log(data)
            const messagesToDisplay = [];
            data.messages.forEach((message) => messagesToDisplay.push({
                from: message.from,
                message: JSON.parse(message.message).message
            }))
            dispatch(initMessages({room: currentRoom, messages: messagesToDisplay}));
        }
    }, [data, dispatch]);

    if (isLoading) {
        return (<CircularProgress/>);
    }

    console.log(messages)

    return (
        <Grid
            container
            spacing={1}
            rowSpacing={1}
            alignItems={"end"}
            alignContent={"end"}
            justifyContent={"center"}
            direction={"row"}
            height={"50vh"}
            overflow={"auto"}
        >
            <Box
                maxHeight={"50vh"}
                width={"80%"}
                overflow={"auto"}
                alignContent={"end"}
            >
                {messages && messages.map((message) => (<Message message={message}/>))}
            </Box>
        </Grid>
    );
}

export default MessageList;
