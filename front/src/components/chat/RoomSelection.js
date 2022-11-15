import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useGetUsersQuery} from "../../redux/api/userApi";
import {joinRoom} from "../../redux/slices/chatSlice";
import Room from "./Room";
import {useEffect} from "react";
import {initUsers} from "../../redux/slices/userSlice";
import {Button, LinearProgress, Grid, IconButton} from "@mui/material";
import {UserAvatar} from "../user/UserAvatar";

const getRoomNameFromUsername = (currentUser, userName) => {
    const roomMembers = [currentUser, userName];
    // We sort by alphabetical order to create a room name common to the two users
    const roomName = roomMembers.sort().join("");

    return `/room/${roomName}`;
}

const RoomSelection = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user).user;
    const users = useSelector((state) => state.user).userList;
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const {data, isLoading} = useGetUsersQuery()
    const connectedUsers = users.filter((user) => user.username !== currentUser);

    useEffect(() => {
        if (data && data.users) {
            dispatch(initUsers(data.users));
        }
    }, [data, dispatch]);

    if (isLoading) {
        return (<LinearProgress/>);
    }

    const onUsernameClick = (username) => {
        if (username !== "general") {
            dispatch(joinRoom(getRoomNameFromUsername(currentUser, username)));
        } else {
            dispatch(joinRoom(`general`));
        }
    }

    return (
        <Grid container>
            <Grid container justifyContent={"center"} alignItems={"center"} style={{height: "64px"}}>
                {connectedUsers.map((user) => (
                    <IconButton
                        variant={"outlined"}
                        onClick={() => onUsernameClick(user.username)}
                    >
                        <UserAvatar
                            sx={currentRoom === getRoomNameFromUsername(currentUser, user.username)
                                ? {width: 50, height: 50}
                                : {width: 36, height: 36}}
                            userName={user.username}
                        />
                    </IconButton>
                ))}

                <Button
                    sx={{marginLeft: "2em"}}
                    variant={currentRoom === "general" ? "contained" : "outlined"}
                    onClick={() => onUsernameClick('general')}
                >
                    general
                </Button>
            </Grid>


            {currentRoom && <Room/>}
        </Grid>
    )
}

export default RoomSelection;
