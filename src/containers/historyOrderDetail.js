import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/navbar';
import HistoryNotHost from '../components/historyNotHost';
import HistoryForHost from '../components/historyForHost';
import AuthContext from '../context/AuthContext';
import useAxios from '../hooks/useAxios';

const HistoryOrderDetail = () => {
  const location = useLocation();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const { history } = location.state || {};
  const [historyInfo, setHistoryInfo] = useState();
  const [orderItem, setOrderItem] = useState();
  // console.log(history);

  useEffect(() => {
    const getHistoryInfo = async () => {
      try {
        const response = await axiosInstance.get('/orderEvent/view', {
          params: {
            oid: history.oid,
          },
        });
        console.log(response);
        setHistoryInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getAllOrderItem = async () => {
      try {
        const response = await axiosInstance.get('/ordering/getAllOrders', {
          params: {
            oid: history.oid,
          },
        });
        setOrderItem(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getHistoryInfo();
    // getAllOrderItem()
  }, []);

  // useEffect(() => {
  //   console.log('historyInfo', historyInfo);
  //   console.log('historyInfo', orderItem);

  // }, [historyInfo]);

  const order_items = [
    { id: 1, food: 'Black Tea', price: 30, note: 'sugar free', quantity: 1 },
    { id: 2, food: 'Toast', price: 60, note: '', quantity: 3 },
    { id: 3, food: 'Chips', price: 30, note: '', quantity: 2 },
  ];

  const all_order_items = [
    {
      orderer: 'John',
      items: [
        {
          id: 1,
          food: 'Black Tea',
          price: 30,
          note: 'sugar free',
          quantity: 1,
        },
        { id: 2, food: 'Toast', price: 60, note: '', quantity: 3 },
        { id: 3, food: 'Chips', price: 30, note: '', quantity: 2 },
      ],
      totalPrice: 240,
    },
    {
      orderer: 'Amy',
      items: [
        {
          id: 1,
          food: 'Black Tea',
          price: 30,
          note: 'sugar free',
          quantity: 1,
        },
        { id: 2, food: 'Toast', price: 60, note: '', quantity: 3 },
        { id: 3, food: 'Chips', price: 30, note: '', quantity: 2 },
      ],
      totalPrice: 240,
    },
  ];

  const [isHost, setIsHost] = useState(false);

  // 判斷 user 是不是 host
  useEffect(() => {
    const userIsHost = true;
    setIsHost(userIsHost);
  }, []);

  const totalPrice = 240;

  if (!history && historyInfo) {
    return <div>No data found</div>;
  }

  return (
    <>
      <NavBar />
      {isHost ? (
        <HistoryForHost
          history={history}
          all_order_items={all_order_items}
          historyInfo={historyInfo}
        />
      ) : (
        <HistoryNotHost
          history={history}
          order_items={order_items}
          totalPrice={totalPrice}
          historyInfo={historyInfo}
        />
      )}
    </>
  );
};

export default HistoryOrderDetail;
