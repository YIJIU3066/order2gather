import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import HistoryNotHost from '../components/historyNotHost';
import HistoryForHost from '../components/historyForHost';

const HistoryOrderDetail = () => {
  const location = useLocation();
  const { history } = location.state || {};
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
      orderer: 'Solar',
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

  if (!history) {
    return <div>No data found</div>;
  }

  return (
    <>
      <NavBar />
      {isHost ? (
        <HistoryForHost history={history} all_order_items={all_order_items} />
      ) : (
        <HistoryNotHost
          history={history}
          order_items={order_items}
          totalPrice={totalPrice}
        />
      )}
    </>
  );
};

export default HistoryOrderDetail;
