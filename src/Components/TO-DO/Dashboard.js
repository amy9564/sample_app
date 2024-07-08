import { Box, Typography } from '@mui/material';

const Dashboard = ({ taskdata }) => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
        >
            <Typography variant="h3" gutterBottom>
                Welcome to Dashboard Panel
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
                <Typography variant="body1" mx={2}>
                    Total Tasks Created: {taskdata?.total}
                </Typography>
                <Typography variant="body1" mx={2}>
                    Total Pending Tasks: {taskdata?.pending}
                </Typography>
                <Typography variant="body1" mx={2}>
                    Total Completed Tasks: {taskdata?.completed}
                </Typography>
            </Box>
        </Box>
    );
}

export default Dashboard;
