import * as React from "react";
import {useDispatch} from "react-redux";
import {create} from "../../redux/slices/userSlice";
import {useCreateUserMutation} from "../../redux/api/userApi";
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Snackbar,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useState} from "react";

const theme = createTheme();

const LoginScreen = () => {
    const dispatch = useDispatch();
    let [createUser, {error}] = useCreateUserMutation();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');

        if (username.split(' ').length > 1) {
            setErrorMessage("Username cannot contain whitespace")
            return;
        }

        createUser({username: username})
            .then((response) => {
                if (response.error === undefined) {
                    dispatch(create(username));
                    // Cookie valid for one hour
                    document.cookie = `username=${username}; max-age=3600`;
                } else {
                    setErrorMessage("The username is already in use, please choose another one.")
                }
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Please enter your username
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            error={error !== undefined}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    open={(error !== undefined || errorMessage !== "")}
                    autoHideDuration={6000}
                    message={errorMessage}
                />
            </Container>
        </ThemeProvider>
    );
}

export default LoginScreen;