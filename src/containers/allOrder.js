import NavBar from '../components/navbar';
import React, { useState, useEffect, useContext } from 'react';
import '../styles/allOrderUI.css';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';
const AllOrder = () => {
  const [openVarValue, setOpenVarValue] = useState(0);
  const [deliverVarValue, setDeliverVarValue] = useState(0);
  const [myName, setMyName] = useState('Host 1');
  const [uid, setUid] = useState(null);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [orderList, setOrderList] = useState([]);
  const [code, setCode] = useState('000000');
  const uniqueData = [];
  const uniqueIds = new Set();
  useEffect(() => {
    setUid(user.uid);
    const getOrderList = async () => {
      try {
        const response = await axiosInstance.get('/orderEvent/view');
        response.data.forEach((item) => {
          // 使用 Set 來追蹤已經出現的 id
          if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            uniqueData.push(item);
          }
        });
        setOrderList(uniqueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const getOrderDetails = async () => {
      try {
        const response = await axiosInstance.get('/orderEvent/view?oid=3 ');
        console.log(response.data);
        setOrderList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getOrderList();
    //getOrderDetails();
  }, []);
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

  function decreaseOpenButtonClick() {
    setOpenVarValue((openVarValue) => {
      const nextValue = openVarValue - 1;
      return nextValue < 0 ? 0 : nextValue;
    });
  }

  function increaseOpenButtonClick() {
    setOpenVarValue((openVarValue) => {
      const nextValue = openVarValue + 1;
      const maxAllowedValue = openOrder_list.length - 2;
      return nextValue >= maxAllowedValue ? nextValue - 1 : nextValue;
    });
  }

  const currentDateTime = new Date();
  //轉換顯示的日期格式
  const dateFormatTransform = (isoDateString) => {
    const date = isoDateString.substring(0, 10);
    const time = isoDateString.substring(11, 16);

    const formattedDate = `${date} ${time}`;
    return formattedDate;
  };
  const openOrder_list = orderList.filter((order) => {
    const openTime = new Date(order.stopOrderingTime);
    return openTime <= currentDateTime;
  });

  const deliverOrder_list = orderList.filter((order) => {
    const openTime = new Date(order.stopOrderingTime);
    return openTime > currentDateTime;
  });

  const openOrder_list_mock = [
    {
      id: 0,
      restaurant: 'Restaurant AAAA',
      openTime: '2023-07-29 10:00',
      deliverTime: '2023-07-29 12:00',
      host: 'Host 1',
    },
    {
      id: 1,
      restaurant: 'Restaurant BBB',
      openTime: '2023-07-29 11:00',
      deliverTime: '2023-07-29 13:00',
      host: 'Host 2',
    },
    {
      id: 2,
      restaurant: 'Restaurant CC',
      openTime: '2023-07-29 17:00',
      deliverTime: '2023-07-29 19:00',
      host: 'Host 1',
    },
    {
      id: 3,
      restaurant: 'Restaurant DD',
      openTime: '2023-07-29 18:00',
      deliverTime: '2023-07-29 20:00',
      host: 'Host 1',
    },
  ];

  const filteredOpenOrder = openOrder_list.filter((item, index) => {
    return [openVarValue, openVarValue + 1, openVarValue + 2].includes(index);
  });

  function decreaseDeliverButtonClick() {
    setDeliverVarValue((deliverVarValue) => {
      const nextValue = deliverVarValue - 1;
      return nextValue < 0 ? 0 : nextValue;
    });
  }

  function increaseDeliverButtonClick() {
    setDeliverVarValue((deliverVarValue) => {
      const nextValue = deliverVarValue + 1;
      const maxAllowedValue = deliverOrder_list.length - 2;
      return nextValue >= maxAllowedValue ? nextValue - 1 : nextValue;
    });
  }

  const deliverOrder_list_mock = [
    {
      id: 0,
      restaurant: 'Restaurant AAAA',
      deliverTime: '2023-07-29 12:00',
      host: 'Host 1',
    },
    {
      id: 1,
      restaurant: 'Restaurant BBB',
      deliverTime: '2023-07-29 13:00',
      host: 'Host 2',
    },
    {
      id: 2,
      restaurant: 'Restaurant CC',
      deliverTime: '2023-07-29 19:00',
      host: 'Host 1',
    },
    {
      id: 3,
      restaurant: 'Restaurant DD',
      deliverTime: '2023-07-29 20:00',
      host: 'Host 2',
    },
    {
      id: 4,
      restaurant: 'Restaurant EE',
      deliverTime: '2023-07-30 20:00',
      host: 'Host 3',
    },
  ];

  const filteredDeliverOrder = deliverOrder_list.filter((item, index) => {
    return [deliverVarValue, deliverVarValue + 1, deliverVarValue + 2].includes(
      index
    );
  });

  return (
    <>
      <NavBar />
      <div className='flex p-10 pb-0 pt-4 items-center justify-center'>
        <h2 className='text-blue font-bold text-4xl'>My Order</h2>
      </div>
      <div className='flex p-10 pb-0 pt-4 items-center justify-left'>
        <h2 className='text-grey font-bold text-2xl'>Open</h2>
      </div>
      <div className='flex p-1 justify-around flex-wrap gap-6'>
        <button
          onClick={decreaseOpenButtonClick}
          className='button-with-left-triangle'
        ></button>
        {filteredOpenOrder.map((item, index) => (
          <div key={item.id} className='flex flex-col items-start'>
            <div
              className='border-b hover:text-white cursor-pointer'
              key={item.id}
              onClick={() => handleOpenClick(item.id)}
            >
              <div
                className={`p-0 pl-1 pr-20 w-180 h-24 items-start rounded-lg ${
                  index === 0
                    ? 'bg-blue'
                    : index === 1
                      ? 'bg-brown'
                      : index === 2
                        ? 'bg-green'
                        : ''
                }`}
              >
                <strong className='flex items-start text-white text-xl p-2'>
                  {' '}
                  {item.rname}
                </strong>
              </div>
            </div>

            <ul className='mt-2'>
              <li>
                <strong className='text-gray-900'>Open until:</strong>
                <div className='text-gray-900'>
                  {dateFormatTransform(item.stopOrderingTime)}
                </div>
              </li>
              <li>
                <strong className='text-gray-900'>
                  Estimated delivery time:
                </strong>
                <div className='text-gray-900'>
                  {dateFormatTransform(item.estimatedArrivalTime)}
                </div>
              </li>
            </ul>
            {item.hostID === uid && (
              <div key={item.id} className='flex flex-col items-center'>
                <div
                  className='border-b hover:text-white cursor-pointer'
                  key={item.id}
                  onClick={() => handleDashboardClick(item.id)}
                >
                  <div className='p-0 py-1 px-6 my-2 rounded-lg bg-red text-center text-white font-medium'>
                    Dashboard
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={increaseOpenButtonClick}
          className='button-with-right-triangle '
        ></button>
      </div>
      <div className='flex p-10 pb-0 pt-4 items-center justify-left'>
        <h2 className='text-grey font-bold text-2xl'>Delivering</h2>
      </div>

      <div className='flex p-1 justify-around flex-wrap gap-6'>
        <button
          onClick={decreaseDeliverButtonClick}
          className='button-with-left-triangle '
        ></button>
        {filteredDeliverOrder.map((item, index) => (
          <div key={item.id} className='flex flex-col items-start'>
            <div
              className='border-b hover:text-white cursor-pointer'
              key={item.id}
              onClick={() => handleDeliverClick(item.id)}
            >
              <div
                className={`p-0 pl-1 pr-20 w-180 h-24 items-start rounded-lg${
                  index === 0
                    ? 'bg-blue'
                    : index === 1
                      ? 'bg-brown'
                      : index === 2
                        ? 'bg-green'
                        : ''
                }`}
              >
                <strong className='flex items-start text-white text-xl p-2'>
                  {' '}
                  {item.rname}
                </strong>
              </div>
            </div>

            <ul className='mt-2'>
              <li>
                <strong>Estimated delivery time:</strong>
                <div>{dateFormatTransform(item.estimatedArrivalTime)}</div>
              </li>
            </ul>
            {item.hostID === uid && (
              <div key={item.id} className='flex flex-col items-center'>
                <div
                  className='border-b hover:text-white cursor-pointer'
                  key={item.id}
                  onClick={() => handleDashboardClick(item.id)}
                >
                  <div className='p-0 py-1 px-6 my-2 rounded-lg bg-red text-center text-white font-medium'>
                    Dashboard
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={increaseDeliverButtonClick}
          className='button-with-right-triangle '
        ></button>
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
