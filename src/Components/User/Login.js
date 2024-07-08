import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, setUser } from '../../Redux/UserSlice';
import Alert, { showSuccessToast, showErrorToast } from "../../Util/Notification/Alert";
import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useToggle from '../../Util/Hooks/useToggle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    console.log(process.env,"12");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userdetails, setUserDetails] = useState({
        email: "",
        password: "",
        captcha: "" // Add state for captcha input
    });

    const [errors, setErrors] = useState({});
  const [state, toggle] = useToggle();
    // Load CAPTCHA engine when the component mounts
    useEffect(() => {
        loadCaptchaEnginge(6); // Number of characters in CAPTCHA
    }, []);

    const handleInput = (v) => {
        const { name, value } = v?.target;
        setUserDetails({ ...userdetails, [name]: value });
    }

    const validateForm = () => {
        let newErrors = {};
        Object.entries(userdetails).forEach(([key, value]) => {
            switch (key) {
                case "email":
                    if (!value) {
                        newErrors.email = "Email is required";
                    } else if (!/\S+@\S+\.\S+/.test(value)) {
                        newErrors.email = "Email address is invalid";
                    }
                    break;
                case "password":
                    if (!value) {
                        newErrors.password = "Password is required";
                    } else if (value.length < 6) {
                        newErrors.password = "Password must be at least 6 characters";
                    } else if (!/(?=.*[a-z])/.test(value)) {
                        newErrors.password = "Password must contain at least one lowercase letter";
                    } else if (!/(?=.*[A-Z])/.test(value)) {
                        newErrors.password = "Password must contain at least one uppercase letter";
                    } else if (!/(?=.*\d)/.test(value)) {
                        newErrors.password = "Password must contain at least one number";
                    } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
                        newErrors.password = "Password must contain at least one special character";
                    }
                    break;
                case "captcha":
                    if (!value) {
                        newErrors.captcha = "CAPTCHA is required";
                    }
                    break;
                default:
                    break;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (validateCaptcha(userdetails.captcha)) { // Validate CAPTCHA
                try {
                    const res = await axios.get("http://localhost:8000/users");
                    const user = res?.data?.find(
                        (u) => u.email === userdetails?.email && u.password === userdetails?.password
                    );
                    if (user) {
                        dispatch(addUser(user));
                        dispatch(setUser(user));
                        showSuccessToast("User Logged in Successfully!!");
                        setTimeout(() => {
                            navigate('/dashboard'); // Navigate to the dashboard page on successful login
                        }, 1000); // Adjust the delay as needed
                    } else {
                        showErrorToast("User does not exist!!");
                    }
                } catch (error) {
                    showErrorToast("An error occurred during login.");
                }
            } else {
                showErrorToast("Please complete the CAPTCHA correctly.");
            }
        } else {
            console.log("Form is invalid", errors);
        }
    }

    const handleClickShowPassword = () => {
        toggle();
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="Email"
                            name="email"
                            value={userdetails.email}
                            onChange={handleInput}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="Password"
                            type={ state ? "text" : "password" }
                            name="password"
                            value={userdetails.password}
                            onChange={handleInput}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {state ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <LoadCanvasTemplate />
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="Enter CAPTCHA"
                            name="captcha"
                            value={userdetails.captcha}
                            onChange={handleInput}
                            error={!!errors.captcha}
                            helperText={errors.captcha}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                        <Link to="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Container>
            <Alert />
        </>
    );
}

export default Login;
