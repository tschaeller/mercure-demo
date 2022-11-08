import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useGetUsersQuery} from "../../redux/api/userApi";
import {joinRoom, newMessage} from "../../redux/slices/chatSlice";
import Room from "./Room";
import {useEffect} from "react";
import {initUsers} from "../../redux/slices/userSlice";

const RoomSelection = props => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user).user;
    const users = useSelector((state) => state.user).userList;
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const {data, error, isLoading} = useGetUsersQuery()
    const connectedUsers = users.filter((user) => user.username !== currentUser);

    useEffect(() => {
        if (data && data.users) {
            dispatch(initUsers(data.users));
        }
    }, [data]);

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    const onUsernameClick = (username) => {
        if (username !== "general") {
            const roomMembers = [currentUser, username];
            // We sort by alphabetical order to create a room name common to the two users
            const roomName = roomMembers.sort().join("");
            dispatch(joinRoom(`/room/${roomName}`));
        } else {
            dispatch(joinRoom(`general`));
        }
    }

    return (
        <div>
            Connected user you can speak to : <br/>
            {connectedUsers.map((user) => (
                <button onClick={() => onUsernameClick(user.username)}>{user.username}</button>
            ))}

            <button onClick={() => onUsernameClick('general')}>general</button>

            {currentRoom && <Room/>}
        </div>
    )
}

export default RoomSelection;
