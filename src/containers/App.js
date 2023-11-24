import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import HostDashboard from "./hostDashboard";
import AllOrder from "./allOrder";
import Ordering from "./ordering";
import CreateOrder from "./createOrder";
import AllRestaurant from "./allRestaurant";
import FriendAndGroup from "./friendAndGroup";
import Report from "./report";
import History from "./history";
import RestaurantDetail from "./restaurantDetail";
import HistoryOrderDetail from "./historyOrderDetail";
import FriendList from './friendList';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hostDashboard" element={<HostDashboard />} />
        <Route path="/allOrder" element={<AllOrder />} />
        <Route path="/ordering" element={<Ordering />} />
        <Route path="/createOrder" element={<CreateOrder />} />
        <Route path="/allRestaurant" element={<AllRestaurant />} />
        <Route path="/friendAndGroup" element={<FriendAndGroup />} />
        <Route path="/report" element={<Report />} />
        <Route path="/history" element={<History />} />
        <Route path="/friendList" element={<FriendList/>}/>
        <Route
          exact
          path="/restaurantDetail/:id"
          element={<RestaurantDetail />}
        />
        <Route
          exact
          path="/historyOrderDetail/:id"
          element={<HistoryOrderDetail />}
        />
        <Route
          exact
          path="/hostDashboard/:id"
          element={<HostDashboard />}
        />
        <Route
          exact
          path="/ordering/:id"
          element={<Ordering />}
        />
      </Routes>
    </Router>
  );
};

export default App;
