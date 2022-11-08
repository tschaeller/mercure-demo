import './App.css';
import LoginScreen from "./components/home/login";
import {useDispatch, useSelector} from "react-redux";
import RoomSelection from "./components/chat/RoomSelection";
import {useEventSource} from "@react-nano/use-event-source";
import {getEventSource, getSSEUrl} from "./services/MercureSubscriptionService";
import {newUser} from "./redux/slices/userSlice";
import {newMessage} from "./redux/slices/chatSlice";
import {useEffect} from "react";

const App = () => {
    const dispatch = useDispatch();
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const currentUser = useSelector((state) => state.user).user;
    const eventSource = getEventSource([`/room/{otherUser}${currentUser}{otherUser}`, `general`, `newUser`]);

    useEffect(() => {
        eventSource.onmessage = ({data}) => {
            const decodedData = JSON.parse(data);

            if (decodedData.topic === 'newUser') {
                dispatch(newUser(decodedData.username));
                return;
            }

            dispatch(newMessage({room: decodedData.topic, message: decodedData.message, from: decodedData.from}))

            if (decodedData.from !== currentUser && decodedData.topic !== currentRoom) {
                alert(`New message from : ${decodedData.from}\n message : ${decodedData.message}`)
            }
        }
    }, [eventSource])

    if (currentUser === undefined) {
        return (<LoginScreen/>);
    }

    return (
        <div>
            Connected as : {currentUser}
            <RoomSelection/>
        </div>

    );
}

export default App;
