import * as React from "react";
import {Chip, Grid} from "@mui/material";
import {useSelector} from "react-redux";

const Message = ({message, ...props}) => {
    const userState = useSelector((state) => state.user.user);
    const messageFromCurrentUser = userState === message.from;

    return (
        <Grid
            container
            xs={9}
            justifyContent={(messageFromCurrentUser ? "right" : "left")}
            height={50}
        >
            <Grid item>
                <Chip
                    color={(messageFromCurrentUser ? "primary" : "success")}
                    label={message.message}
                />
            </Grid>
        </Grid>
    );
}

export default Message;
