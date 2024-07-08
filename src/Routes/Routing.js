import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from "../Components/User/Registration";
import Login from "../Components/User/Login";
import Kanbanboard from '../Components/TO-DO/Kanbanboard';

 const Routing = () => {
    return (
        <>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<Kanbanboard />} />
            </Routes>
        </Router>
        </>
    )
 }

 export default Routing