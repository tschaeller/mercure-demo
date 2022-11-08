import * as React from "react";

const Message = ({message, ...props}) => {
    return (
        <div style={{width: "100%"}}>
            {message.from} : {message.message}
        </div>
    );
}

export default Message;
