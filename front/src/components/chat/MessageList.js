import * as React from "react";
import {useSelector} from "react-redux";
import Message from "./Message";

const MessageList = props => {
    const userState = useSelector((state) => state.user.user);
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const messages = useSelector((state) => state.chat.messages[currentRoom]);

    return (
        <div>
            {messages && messages.map((message) => (<Message message={message}/>))}
        </div>
    );
}

export default MessageList;
