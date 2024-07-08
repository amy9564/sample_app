import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Taskmanagement from "./Taskmanagement";
import { useSelector } from 'react-redux';
import { currentUser } from '../../Redux/UserSlice';
import { Box, Button, Typography, Avatar } from '@mui/material';
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Kanbanboard = () => {

    const [tasks, setTasks] = useState([]);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [taskdata, setTaskData] = useState([{
        total: "",
        pending: "",
        completed: ""
    }]);
    const [loggedin, setLoggedIn] = useState();
    const users = useSelector(currentUser);

    useEffect(() => {
        if (tasks?.length > 0) {
            let totaltasks = tasks.length;
            let pendingtasks = tasks.filter(task => task.stage < 3).length;
            let completedtasks = tasks.filter(task => task.stage === 3).length;

            setTaskData({
                total: totaltasks,
                pending: pendingtasks,
                completed: completedtasks
            });
        }
    }, [tasks])

    useEffect(() => {
        if (users) {
            setLoggedIn(users);
        }
    },[])

    return (
        <>
            <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
                <Sidebar setActiveSection={setActiveSection} />
                <Box sx={{width: '100%'}}>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                <Header loggedin={loggedin} />
                </div>
                <div>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    padding: '2rem',
                }}>
                    {activeSection === 'dashboard' && <Dashboard taskdata={taskdata} />}
                    {activeSection === 'taskmanagement' && <Taskmanagement tasks={tasks} setTasks={setTasks} />}
                </Box>
                </div>
                </Box>
            </Box>
        </>
    )
}

export default Kanbanboard;

