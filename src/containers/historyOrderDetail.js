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
  const [allOrderItem, setAllOrderItem] = useState();

  useEffect(() => {
    const getHistoryInfo = async () => {
      try {
        const response = await axiosInstance.get('/orderEvent/view', {
          params: {
            oid: history.oid,
          },
        });
        setHistoryInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getAllOrderItem = async () => {
      try {
        const response = await axiosInstance.get('/orderEvent/organize', {
          params: {
            oid: history.oid,
          },
        });
        setAllOrderItem(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getHistoryInfo();
    getAllOrderItem();
  }, []);

  const [isHost, setIsHost] = useState(false);

  // 判斷 user 是不是 host
  useEffect(() => {
    if (historyInfo) {
      if (user.uid === historyInfo.hostID) {
        setIsHost(true);
      } else {
        setIsHost(false);
        const myOrder = allOrderItem.orders.filter(
          (order) => order.uid === user.uid
        );
        setOrderItem(myOrder);
      }
    }
  }, [allOrderItem]);

  if (!history && historyInfo) {
    return <div>No data found</div>;
  }

  return (
    <>
      <NavBar />
      {isHost
        ? allOrderItem && (
            <HistoryForHost
              history={history}
              allOrderItem={allOrderItem}
              historyInfo={historyInfo}
            />
          )
        : orderItem && (
            <HistoryNotHost
              history={history}
              orderItem={orderItem}
              historyInfo={historyInfo}
            />
          )}
    </>
  );
};

export default HistoryOrderDetail;
