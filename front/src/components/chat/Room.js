import * as React from "react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {usePostMessageMutation} from "../../redux/api/chatApi";
import MessageList from "./MessageList";

const Room = props => {
    const userState = useSelector((state) => state.user.user);
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const [messageValue, setMessageValue] = useState("");
    const [postMessage, result] = usePostMessageMutation();

    // Reset the text input when you switch room
    useEffect(() => {
        setMessageValue("")
    }, [currentRoom])

    const onMessageSendClick = () => {
        if (messageValue !== "") {
            postMessage({message: messageValue, topic: currentRoom, from: userState})
            setMessageValue("")
        }
    }

    return (
        <div>
            Currently in the Room : {currentRoom} <br/><br/>

            <MessageList/>

            <input type={"text"} value={messageValue} onChange={(event) => setMessageValue(event.target.value)}/>
            <button onClick={onMessageSendClick}>Send message</button>
        </div>
    );
}

export default Room;
