import NavBar from "../components/navbar";
import React, { useState } from 'react';
import '../styles/allOrderUI.css'
import { Link, useNavigate } from "react-router-dom";
const AllOrder = () => {

    const [openVarValue, setOpenVarValue] = useState(0);
    const [deliverVarValue, setDeliverVarValue] = useState(0);
    const [myName, setMyName] = useState("Host 1");
    
    const navigate = useNavigate();

    const handleOpenClick = (id) => {
        // 導航至相應的詳細頁面，假設路由設置為 `/ordering/:id`
        navigate(`/ordering/${id}`);
    };

    const handleDeliverClick = (id) => {
        // 導航至相應的詳細頁面，假設路由設置為 `/historyOrderDetail/:id`
        navigate(`/historyOrderDetail/${id}`);
    };

    const handleDashboardClick = (id) => {
        // 導航至相應的詳細頁面，假設路由設置為 `/hostDashboard/:id`
        navigate(`/hostDashboard/${id}`);
    };

    function decreaseOpenButtonClick (){
        setOpenVarValue(openVarValue => {
            const nextValue = openVarValue - 1;
            return nextValue < 0 ? 0 : nextValue;
        });
    };
    
    function increaseOpenButtonClick (){
        setOpenVarValue(openVarValue => {
            const nextValue = openVarValue + 1;
            const maxAllowedValue = openOrder_list.length - 2;
            return nextValue >= maxAllowedValue ? nextValue - 1 : nextValue;
        });
    };

    const openOrder_list = [
        {
            id: 0,
            restaurant: "Restaurant AAAA",
            openTime: "2023-07-29 10:00",
            deliverTime: "2023-07-29 12:00",
            host: "Host 1",
        },
        {
            id: 1,
            restaurant: "Restaurant BBB",
            openTime: "2023-07-29 11:00",
            deliverTime: "2023-07-29 13:00",
            host: "Host 2",
        },
        {
            id: 2,
            restaurant: "Restaurant CC",
            openTime: "2023-07-29 17:00",
            deliverTime: "2023-07-29 19:00",
            host: "Host 1",
        },
        {
            id: 3,
            restaurant: "Restaurant DD",
            openTime: "2023-07-29 18:00",
            deliverTime: "2023-07-29 20:00",
            host: "Host 1",
        },
    ];

    const filteredOpenOrder = openOrder_list.filter(item => {
        return item.id === openVarValue || item.id === openVarValue + 1 || item.id === openVarValue + 2;
    });

    function decreaseDeliverButtonClick (){
        setDeliverVarValue(deliverVarValue => {
            const nextValue = deliverVarValue - 1;
            return nextValue < 0 ? 0 : nextValue;
        });
    };
    
    function increaseDeliverButtonClick (){
        setDeliverVarValue(deliverVarValue => {
            const nextValue = deliverVarValue + 1;
            const maxAllowedValue = deliverOrder_list.length - 2;
            return nextValue >= maxAllowedValue ? nextValue - 1 : nextValue;
        });
    };

    const deliverOrder_list = [
        {
            id: 0,
            restaurant: "Restaurant AAAA",
            deliverTime: "2023-07-29 12:00",
            host: "Host 1",
        },
        {
            id: 1,
            restaurant: "Restaurant BBB",
            deliverTime: "2023-07-29 13:00",
            host: "Host 2",
        },
        {
            id: 2,
            restaurant: "Restaurant CC",
            deliverTime: "2023-07-29 19:00",
            host: "Host 1",
        },
        {
            id: 3,
            restaurant: "Restaurant DD",
            deliverTime: "2023-07-29 20:00",
            host: "Host 2",
        },
        {
            id: 4,
            restaurant: "Restaurant EE",
            deliverTime: "2023-07-30 20:00",
            host: "Host 3",
        },
    ];

    const filteredDeliverOrder= deliverOrder_list.filter(item => {
        return item.id === deliverVarValue || item.id === deliverVarValue + 1 || item.id === deliverVarValue + 2;
    });

    return (    
        <>
            <NavBar/>
            <div className="flex p-10 pb-0 pt-4 items-center justify-center">
                <h2 className="text-blue font-bold text-4xl">My Order</h2>
            </div>        
            <div className="flex p-10 pb-0 pt-4 items-center justify-left">
                <h2 className="text-grey font-bold text-2xl">Open</h2>
            </div>
            <div className="flex p-1 justify-around flex-wrap gap-6">
                <button onClick={decreaseOpenButtonClick} className="button-with-left-triangle "></button>
                {filteredOpenOrder.map(item => (
                <div key={item.id} className="flex flex-col items-start">
                    <div
                    className="border-b hover:text-white cursor-pointer"
                    key={item.id}
                    onClick={() => handleOpenClick(item.id)}
                    >
                        <div
                            className={`p-0 pl-1 pr-20 w-180 h-24 items-start ${
                            item.id === openVarValue
                                ? 'bg-blue'
                                : item.id === openVarValue + 1
                                ? 'bg-brown'
                                : item.id === openVarValue + 2
                                ? 'bg-green'
                                : ''
                            }`}
                        >
                        <strong className="items-start p-0"></strong> {item.restaurant}
                        </div>
                    </div>
                    
                    <ul className="mt-2">
                    <li>
                        <strong>Open until:</strong>
                        <div>{item.openTime}</div>
                    </li>
                    <li>
                        <strong>Estimated delivery time:</strong>
                        <div>{item.deliverTime}</div>
                    </li>
                    </ul>
                    {item.host === myName && (
                        <div key={item.id} className="flex flex-col items-center">
                            <div
                            className="border-b hover:text-white cursor-pointer"
                            key={item.id}
                            onClick={() => handleDashboardClick(item.id)}
                            >
                                <div className="p-0 pl-2 pr-20 w-160 h-18 rounded-2xl bg-red text-center">Dashboard</div>
                            </div>
                        </div>
                    )}
                </div>
                ))}
                <button onClick={increaseOpenButtonClick} className="button-with-right-triangle "></button>
            </div>        
            <div className="flex p-10 pb-0 pt-4 items-center justify-left">
                <h2 className="text-grey font-bold text-2xl">Delivering</h2>
            </div>

            <div className="flex p-1 justify-around flex-wrap gap-6">    
                <button onClick={decreaseDeliverButtonClick} className="button-with-left-triangle "></button>
                {filteredDeliverOrder.map(item => (
                <div key={item.id} className="flex flex-col items-start">
                    <div
                    className="border-b hover:text-white cursor-pointer"
                    key={item.id}
                    onClick={() => handleDeliverClick(item.id)}
                    >
                        <div
                            className={`p-0 pl-1 pr-20 w-180 h-24 items-start ${
                            item.id === deliverVarValue
                                ? 'bg-blue'
                                : item.id === deliverVarValue + 1
                                ? 'bg-brown'
                                : item.id === deliverVarValue + 2
                                ? 'bg-green'
                                : ''
                            }`}
                        >
                        <strong className="items-start p-0"></strong> {item.restaurant}
                        </div>
                    </div>
                    
                    <ul className="mt-2">
                    <li>
                        <strong>Estimated delivery time:</strong>
                        <div>{item.deliverTime}</div>
                    </li>
                    </ul>
                    {item.host === myName && (
                        <div key={item.id} className="flex flex-col items-center">
                            <div
                            className="border-b hover:text-white cursor-pointer"
                            key={item.id}
                            onClick={() => handleDashboardClick(item.id)}
                            >
                                <div className="p-0 pl-2 pr-20 w-160 h-18 rounded-2xl bg-red text-center">Dashboard</div>
                            </div>
                        </div>
                    )}
                </div>
                ))}
                <button onClick={increaseDeliverButtonClick} className="button-with-right-triangle "></button>
            </div> 


        </>
    );
        
        //return (
        //    <>
        //        <div>AllOrder</div>
        //    </>
        //);
};
export default AllOrder;
