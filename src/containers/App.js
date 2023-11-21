import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import HostDashboard from './hostDashboard';
import AllOrder from './allOrder';
import CreateOrder from './createOrder';
import AllRestaurant from './allRestaurant';
import FriendAndGroup from './friendAndGroup';
import Report from './report';
import History from './history';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hostDashboard" element={<HostDashboard />} />
                <Route path="/allOrder" element={<AllOrder />} />
                <Route path="/createOrder" element={<CreateOrder />} />
                <Route path="/allRestaurant" element={<AllRestaurant />} />
                <Route path="/friendAndGroup" element={<FriendAndGroup />} />
                <Route path="/report" element={<Report />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </Router>
    );
};

export default App;