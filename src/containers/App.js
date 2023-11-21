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
import FriendList from './friendList';
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
                <Route path="/friendList" element={<FriendList/>}/>
            </Routes>
        </Router>
    );
};

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
