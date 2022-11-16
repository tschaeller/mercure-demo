import * as React from "react";
import {Chip, createTheme, Grid, ThemeProvider, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";

const theme = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    height: 'auto',
                },
            },
        },
    },
});

const Message = ({message, ...props}) => {
    const userState = useSelector((state) => state.user.user);
    const messageFromCurrentUser = userState === message.from;
    const messageComponentRef = useRef(null)

    useEffect(() => {
        if (messageComponentRef) {
            messageComponentRef.current.scrollIntoView()
        }
    }, [messageComponentRef]);

    return (
        <Grid
            container
            xs={12}
            justifyContent={(messageFromCurrentUser ? "right" : "left")}
            marginTop={"1em"}
            marginBottom={"1em"}
        >
            <Grid
                item
                ref={messageComponentRef}
                maxWidth={"45%"}
            >
                {!messageFromCurrentUser && <Typography variant={"subtitle2"}>{message.from}</Typography>}
                <ThemeProvider theme={theme}>
                    <Chip
                        size={"medium"}
                        color={(messageFromCurrentUser ? "primary" : "success")}
                        label={<Typography sx={{whiteSpace: "normal"}}>{message.message}</Typography>}
                    />
                </ThemeProvider>
            </Grid>
        </Grid>
    );
}

export default Message;
