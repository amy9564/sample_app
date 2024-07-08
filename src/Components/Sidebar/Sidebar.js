import { Box, Button } from '@mui/material';

const Sidebar = ({ setActiveSection }) => {
    return (
        <>
            <Box sx={{
                width: '18rem',
                bgcolor: '#e0f2f1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                boxSizing: 'border-box',
            }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setActiveSection('dashboard')}
                    sx={{ mb: "1.5rem", mt: "2rem", width: "18rem", height: "3rem", bgcolor: '#A9A9A9' }}
                >
                    Dashboard
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setActiveSection('taskmanagement')}
                    sx={{ mb: "1.5rem", mt: "2rem", width: "18rem", height: "3rem", bgcolor: '#A9A9A9' }}
                >
                    Task Management
                </Button>
            </Box>
        </>
    )
}

export default Sidebar;