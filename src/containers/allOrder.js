import NavBar from "../components/navbar";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
const AllOrder = () => {

    const [openVarValue, setOpenVarValue] = useState(0);
    const [deliverVarValue, setDeliverVarValue] = useState(0);
    const [myName, setMyName] = useState("Host 1");
    
    const navigate = useNavigate();

    const handleOpenClick = (id) => {
        // 導航至相應的詳細頁面，假設路由設置為 `/historyOrderDetail/:id`
        navigate(`/historyOrderDetail/${id}`);
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
            host: "Host 1",
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
            host: "Host 1",
        },
        {
            id: 4,
            restaurant: "Restaurant EE",
            deliverTime: "2023-07-30 20:00",
            host: "Host 5",
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
            <div>
                <h1>Order</h1>
                <p>Displaying items with id: {openVarValue}, {openVarValue + 1}, and {openVarValue + 2}</p>
                
                
                <div className="flex p-1 items-start justify-around flex-wrap gap-6">
                    <button onClick={decreaseOpenButtonClick}>Decrease</button>
                    {filteredOpenOrder.map(item => (
                        <div key={item.id} className="flex flex-col items-start">
                        <tr
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
                        </tr>
                        
                        <ul className="mt-2">
                          <li>
                            <strong>Open Time:</strong> {item.openTime}
                          </li>
                          <li>
                            <strong>Deliver Time:</strong> {item.deliverTime}
                          </li>
                          <li>
                            <strong>Host:</strong> {item.host}
                          </li>
                        </ul>
                        {item.host === myName && (
                            <div key={item.id} className="flex flex-col items-center">
                                <tr
                                className="border-b hover:text-white cursor-pointer"
                                key={item.id}
                                onClick={() => handleDashboardClick(item.id)}
                                >
                                <div
                                    className={"p-0 pl-1 pr-20 w-160 h-18 items-center bg-red"}
                                >
                                    <div className="items-start p-0">Dashboard</div>
                                </div>
                                </tr>
                            </div>
                            )}
                      </div>
                    ))}
                    <button onClick={increaseOpenButtonClick}>Increase</button>
                </div>
            </div>        
            <div className="flex p-10 pb-0 pt-4 items-center justify-left">
                <h2 className="text-grey font-bold text-2xl">Delivering</h2>
            </div>
            <div>
                <h1>Order</h1>
                <p>Displaying items with id: {deliverVarValue}, {deliverVarValue + 1}, and {deliverVarValue + 2}</p>
                
                
                <div className="flex p-1 items-center justify-around flex-wrap gap-6">
                    <button onClick={decreaseDeliverButtonClick}>Decrease</button>
                    {filteredDeliverOrder.map(item => (
                        <div key={item.id} className="flex flex-col items-start">
                        <tr
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
                        </tr>
                        
                        <ul className="mt-2">
                          <li>
                            <strong>Deliver Time:</strong> {item.deliverTime}
                          </li>
                          <li>
                            <strong>Host:</strong> {item.host}
                          </li>
                        </ul>
                      </div>
                    ))}
                    <button onClick={increaseDeliverButtonClick}>Increase</button>
                </div>
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
