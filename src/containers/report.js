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
            <div className="flex p-10 pb-10 pt-4 items-center justify-center">
                <h2 className="text-blue font-bold text-4xl">Report Order</h2>
            </div>
            <div className="flex pl-1/8 pr-1/8 items-center justify-center gap-6">
                <ul>
                    <div className="p-4 w-180 h-18 items-start grid grid-cols-3 gap-2">
                        <div className="text-center text-blue text-2xl">Restaurant: {order[0].restaurant}</div>
                        <div className="text-center text-blue text-2xl">{order[0].orderTime}</div>
                        <div className="text-center text-blue text-2xl">Host: {order[0].host}</div>
                    </div>
                </ul>
            </div>
            <div className="flex pb-6 pt-4">
                <div className="w-1/6"></div>
                <span className="text-yellow font-bold pr-4 text-2xl">Title: </span>
                <input className="flex-grow text-black border border-2 border-yellow rounded-md" type="text" placeholder=" Enter title" value={title} onChange={handleTitleChange}/>
                <div className="w-1/6 be-green"></div>
            </div>
            <div className="flex items-center">
                <div className="w-1/6"></div>
                <span className="text-yellow font-bold pr-4 text-2xl">Details: </span>
                <div className="w-1/6"></div>
            </div>
            <div className="flex items-center">
                <div className="w-1/4"></div>
                <textarea
                    className="w-full p-2 border border-yellow border-2 rounded-md"
                    placeholder="Enter Details"
                    rows="8"
                    value={details}
                    onChange={handleDetailsChange}
                ></textarea>
                <div className="w-1/4"></div>
            </div>
            <div className="flex pl-2 pr-2 items-center justify-center gap-6">
                <div className="p-4 w-180 h-18 items-start grid grid-cols-2 gap-2">
                    <div className="flex pl-20 pr-20 items-center justify-center flex-wrap gap-6">
                        <div className="border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-blue"
                            onClick={() => handleBackClick(myID, order[0])}
                        >
                            <h2 className="pt-2 text-center text-white font-bold text-1xl">Back</h2>
                        </div>
                    </div>
                    <div className="flex pl-20 pr-20 items-center justify-center flex-wrap gap-6">
                        <div className="border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-yellow"
                            onClick={() => handleReportClick()}
                        >
                            <h2 className="pt-2 text-center text-white font-bold text-1xl">Report</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div>{title}</div>
            <div>{details}</div>
            { reportSent&& (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100">
                    <ReportSuccessMessage success={success} setReportSent={setReportSent}/>
                </div>
            )}
        </>
    );
};
export default Report;
