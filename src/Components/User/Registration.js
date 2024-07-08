import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Alert, { showErrorToast, showSuccessToast } from "../../Util/Notification/Alert";
import { TextField, Button, Container, Typography, Box, Paper ,  IconButton, InputAdornment} from '@mui/material';
import useToggle from '../../Util/Hooks/useToggle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Registration = () => {
    // const classes = useStyles();
    const navigate = useNavigate();
    const [formvalues, setFormValues] = useState({
        name: "",
        username: "",
        email: "",
        contactnumber: "",
        password: "",
        profileimage: ""
    });
    const [errors, setErrors] = useState({});
  const [state, toggle] = useToggle();

    const handleInput = (v) => {
        const { name, value } = v?.target;
        setFormValues({ ...formvalues, [name]: value });
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormValues({
                ...formvalues,
                profileimage: URL.createObjectURL(file) // Create object URL for preview,
            });
        }
    }

    const validateForm = () => {
        let newErrors = {};

        Object.entries(formvalues).forEach(([key, value]) => {
            switch (key) {
                case "name":
                    if (!value.trim()) {
                        newErrors.name = "Name is required";
                    } else {
                        const letters = value.replace(/\s+/g, '');
                        if (letters.length < 2) {
                            newErrors.name = "Name must contain at least two letters";
                        } else if (letters.length > 12) {
                            newErrors.name = "Name must be a maximum of 12 letters";
                        }
                    }
                    break;
                case "username":
                    if (!value.trim()) {
                        newErrors.username = "Username is required";
                    }
                    break;
                case "email":
                    if (!value) {
                        newErrors.email = "Email is required";
                    } else if (!/\S+@\S+\.\S+/.test(value)) {
                        newErrors.email = "Email address is invalid";
                    }
                    break;
                // case "contactnumber":
                //     if (!value.trim()) {
                //         newErrors.contactnumber = "Contact number is required";
                //     } else if (!/^\d{10}$/.test(value)) {
                //         newErrors.contactnumber = "Contact number must be exactly 10 digits";
                //     }
                //     break;
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
                default:
                    break;
            }
        });
console.log("newErrorsnewErrors",newErrors);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleRegistration = async (e) => {
        console.log("handleRegistrationcalled");
        e.preventDefault();
        if (validateForm()) {

            let required_dataformat = {
                "id": uuidv4(),
                "name": formvalues?.name,
                "username": formvalues?.username,
                "email": formvalues?.email,
                "cnumber": formvalues?.contactnumber,
                "password": formvalues?.password,
                "profileimage": formvalues?.profileimage
            }
            let res = await axios.post('http://localhost:8000/users', required_dataformat);
            showSuccessToast('User has been registered succesfully');
            if (res.status) {
                setTimeout(() => {
                    navigate("/login");
                }, 1000); // Adjust the delay as needed
            }
            // Proceed with form submission or further processing
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
            <Container maxWidth="false" sx={{ width: '83vh', my: 5 }} >
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="53vh" >
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Welcome to Registration
                        </Typography>
                        <Box component="form" onSubmit={handleRegistration} noValidate autoComplete="off">
                            <TextField
                                fullWidth
                                size="small"
                                margin="normal"
                                label="Name"
                                name="name"
                                value={formvalues.name}
                                onChange={handleInput}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                margin="normal"
                                label="Username"
                                name="username"
                                value={formvalues.username}
                                onChange={handleInput}
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                margin="normal"
                                label="Email"
                                name="email"
                                value={formvalues.email}
                                onChange={handleInput}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                margin="normal"
                                label="Contact Number"
                                name="contactnumber"
                                value={formvalues.contactnumber}
                                onChange={handleInput}
                                error={!!errors.contactnumber}
                                helperText={errors.contactnumber}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                margin="normal"
                                label="Password"
                                type={state ? "password" : "text"}
                                name="password"
                                value={formvalues.password}
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
                                                {state ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {console.log("true",state)}
                            <input
                                accept="image/*"
                                id="profileimage"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileInput}
                            />
                            <label htmlFor="profileimage">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component="span"
                                    sx={{ mt: 2, mb: 1 }}
                                >
                                    Upload Profile Image
                                </Button>
                            </label>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>

                        </Box>
                        <Link to="/login" variant="body2">
                            {"Already have an account? Log In"}
                        </Link>
                    </Paper>
                </Box>
                <Alert />
            </Container>
        </>
    )
}

export default Registration;
