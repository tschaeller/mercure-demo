import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LoginScreen from "./components/home/Login";
import {useDispatch, useSelector} from "react-redux";
import RoomSelection from "./components/chat/RoomSelection";
import {getEventSource} from "./services/MercureSubscriptionService";
import {newUser} from "./redux/slices/userSlice";
import {joinRoom, newMessage} from "./redux/slices/chatSlice";
import {useEffect, useState} from "react";
import {Grid, Snackbar, Typography} from "@mui/material";
import {UserAvatar} from "./components/user/UserAvatar";
import * as React from "react";

const App = () => {
    const dispatch = useDispatch();
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const currentUser = useSelector((state) => state.user).user;
    const [newMessageReceived, setNewMessageReceived] = useState(false);
    const [newMessageReceivedNotification, setNewMessageReceivedNotification] = useState("");
    const [newMessageReceivedRoom, setNewMessageReceivedRoom] = useState("");

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        const eventSource = getEventSource([`/room/{otherUser}${currentUser}{otherUser}`, `general`, `newUser`]);

        eventSource.onmessage = ({data}) => {
            const decodedData = JSON.parse(data);

            if (decodedData.topic === 'newUser') {
                dispatch(newUser(decodedData.username));
                return;
            }

            if (decodedData.topic === currentRoom) {
                dispatch(newMessage({room: decodedData.topic, message: decodedData.message, from: decodedData.from}))
            }

            if (decodedData.from !== currentUser && decodedData.topic !== currentRoom) {
                setNewMessageReceived(true)
                setNewMessageReceivedNotification(`New message from ${decodedData.from}`)
                setNewMessageReceivedRoom(decodedData.topic)
            }
        }
    }, [currentUser, dispatch, currentRoom]);

    if (currentUser === undefined) {
        return (<LoginScreen/>);
    }

    const onHideNotification = () => {
        setNewMessageReceived(false)
        setNewMessageReceivedNotification("")
        setNewMessageReceivedRoom("")
    }

    const onClickNotification = () => {
        if (newMessageReceivedRoom) {
            dispatch(joinRoom(newMessageReceivedRoom))
            setNewMessageReceivedRoom("")
        }
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} className={"App-header"}>
                <Typography fontSize={"xxx-large"}>Welcome to Mercure.rocks</Typography>
            </Grid>

            <Grid container xs={12} justifyContent={"right"}>
                <Grid item xs={1} marginTop={"2em"} textAlign={"right"} paddingRight={"1em"}>
                    <UserAvatar userName={currentUser}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <RoomSelection/>
            </Grid>
            <Snackbar
                open={newMessageReceived}
                className={"clickable"}
                onClick={onClickNotification}
                autoHideDuration={6000}
                message={newMessageReceivedNotification}
                onClose={onHideNotification}
            />
        </Grid>
    );
}

export default App;
