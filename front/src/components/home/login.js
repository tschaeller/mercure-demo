import * as React from "react";
import {useDispatch} from "react-redux";
import {create} from "../../redux/slices/userSlice";
import {useState} from "react";
import {useCreateUserMutation, useGetUsersQuery} from "../../redux/api/userApi";

const LoginScreen = props => {
    const dispatch = useDispatch();
    const [loginValue, setLoginValue] = useState();

    // Using a query hook automatically fetches data and returns query values
    const {data, error, isLoading} = useGetUsersQuery()
    const [createUser, result] = useCreateUserMutation();

    const onUserCreate = () => {
        createUser({username: loginValue})
            .then((response) => {
                dispatch(create(loginValue));
                document.cookie = `username=${loginValue}`;
            });
    }

    return (
        <div>
            <div> List of connected users
                : {isLoading ? 'loading...' : data.users.map((user) => `${user.username} `)}</div>
            Login please : <input type={"text"} value={loginValue}
                                  onChange={(event) => setLoginValue(event.target.value)}/>
            <button onClick={onUserCreate}>Save</button>
        </div>
    );
}

export default LoginScreen;