import NavBar from "../components/navbar";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReportSuccessMessage from '../components/reportSuccessMessage';
const Report = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [reportSent, setReportSent] = useState(0);
    const [myID, setID] = useState(0);
    const [order, setOrder] = useState([
        {
            id: 0,
            restaurant: "Morning flavor",
            orderTime: "2023/7/19 12:00", //order delivery time
            host: "Olivia@gmail.com" //email
        },
    ])
    const [title, setTitle] = useState("");
        const handleTitleChange = (e) => {
            setTitle(e.target.value);
    };
    const [details, setDetails] = useState("");
        const handleDetailsChange = (e) => {
            setDetails(e.target.value);
    };
    const handleBackClick = (id, order) => {
        // 導航至相應的詳細頁面，假設路由設置為 `/historyOrderDetail/:id`
        navigate(`/historyOrderDetail/${id}`, { state: { history: order } });
      };
    const handleReportClick = () => {
        //TODO: sent report to backend
        setSuccess(true)
        setReportSent(1);
    };
    return (
        <>
            <NavBar/>
            
        </>
    );
};
export default Report;
