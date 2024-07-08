import { Box, Button, Typography, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = ({ loggedin }) => {
    console.log("Headerrendered");
    return (
        <>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box mr={2}>
                        {loggedin?.name}
                    </Box>
                    {loggedin?.profileimage && (
                        <Avatar
                            sx={{ width: 80, height: 80, ml: 2 }}
                            alt="Profile Image"
                            src={loggedin?.profileimage}
                        />
                    )}
                    <Link to="/login" variant="body2">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ ml: 2 }}
                        >
                            Log Out user
                        </Button>
                    </Link>
                </Box>
        </>
    )
}

export default Header;