import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const History = () => {
  const navigate = useNavigate();
  const tempAccessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjYsImlhdCI6MTcwMTQxNjYyNCwiZXhwIjoxNzAxNDIwMjI0fQ.cSibJUpHpYURPrnG9sMaPfJFhj9QThziWEnMPhTRK9I';

  const axiosInstance = useAxios(tempAccessToken);

  // const axiosInstance = useAxios();

  const [history_list, setHistoryList] = useState([]);
  useEffect(() => {
    const getAllHistory = async () => {
      try {
        const response = await axiosInstance.get('/history/get');
        console.log(response);
        setHistoryList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllHistory();
  }, []);

  // const history_list = [
  //   {
  //     id: 1,
  //     orderTime: '2023-11-01',
  //     restaurant: 'Restaurant AAAA',
  //     host: 'Host 1',
  //   },
  //   {
  //     id: 2,
  //     orderTime: '2023-11-02',
  //     restaurant: 'Restaurant B',
  //     host: 'Host 2',
  //   },
  //   {
  //     id: 3,
  //     orderTime: '2023-11-03',
  //     restaurant: 'Restaurant C',
  //     host: 'Host 3',
  //   },
  //   {
  //     id: 4,
  //     orderTime: '2023-11-03',
  //     restaurant: 'Restaurant C',
  //     host: 'Host 4',
  //   },
  // ];

  const handleRowClick = (id, history) => {
    // 導航至相應的詳細頁面，假設路由設置為 `/historyOrderDetail/:id`
    navigate(`/historyOrderDetail/${id}`, { state: { history: history } });
  };

  return (
    <>
      <NavBar />
      <div className='history_container flex flex-col justify-center items-center '>
        <div className='flex justify-center text-3xl font-semibold text-blue my-6'>
          History Order
        </div>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full py-2'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-center text-base font-normal text-gray-900'>
                <thead className='border-b font-semibold text-blue'>
                  <tr>
                    <th scope='col' className='px-12 py-4'>
                      #
                    </th>
                    <th scope='col' className='px-12 py-4'>
                      Order Time
                    </th>
                    <th scope='col' className='px-12 py-4'>
                      Restaurant
                    </th>
                    <th scope='col' className='px-12 py-4'>
                      Host
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history_list.map((history, index) => (
                    <tr
                      className='border-b hover:bg-blue hover:text-white cursor-pointer'
                      key={index}
                      onClick={() => handleRowClick(history.id, history)}
                    >
                      <td className='whitespace-nowrap px-12 py-4 font-medium'>
                        {history.id}
                      </td>
                      <td className='whitespace-nowrap px-12 py-4'>
                        {history.orderTime}
                      </td>
                      <td className='whitespace-nowrap px-12 py-4'>
                        {history.restaurant}
                      </td>
                      <td className='whitespace-nowrap px-12 py-4'>
                        {history.host}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default History;
