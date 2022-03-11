import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#c7d4f3',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#b39ddb',
            main: '#9575cd',
            dark: '#7e57c2',
            contrastText: '#330e62',
        },
    },
});


function LogInComponent() {
    const [token, setToken] = useState('');
    const [tokenExpirationDate, setTokenExpirationDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const changeToken = (e) => {
        const {name, value} = e.currentTarget;
        setToken(value);
    }

    const changeTokenExpirationDate = (e) => {
        const {name, value} = e.currentTarget;
        setTokenExpirationDate(value);
    }

    const changeEmail = (e) => {
        const {name, value} = e.currentTarget;
        setEmail(value);
    }

    const changePassword = (e) => {
        const {name, value} = e.currentTarget;
        setPassword(value);
    }

    const tryLogIn = () => {
        fetch("http://localhost:8080/v1/auth",{
            mode: 'cors',
            method: 'POST',
            body:JSON.stringify({
                "email": email,
                "password": password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(jsonResponse => {
                localStorage.setItem("token", jsonResponse.token);
                localStorage.setItem("tokenExpirationDate", jsonResponse.expirationDate);
                setToken(jsonResponse.token);
                setTokenExpirationDate(jsonResponse.expirationDate)
                navigate("/tasks");
        })
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                    backgroundColor: 'primary.light',
                    backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/4524/4524860.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '70%',
                    backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5"> TO-DO PLANNING </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={changeEmail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={changePassword}
                            />
                            <Button
                                color="secondary"
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={tryLogIn}
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Sign In
                            </Button>    
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
export default LogInComponent;