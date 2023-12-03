import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
// import AuthContext from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const History = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [historyList, setHistoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 每頁顯示的項目數量

  useEffect(() => {
    const getAllHistory = async () => {
      try {
        const response = await axiosInstance.get('/history/view');
        setHistoryList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAllHistory();
  }, []);

  //轉換顯示的日期格式
  const dateFormatTransform = (isoDateString) => {
    const isoDate = new Date(isoDateString);
    const year = isoDate.getFullYear();
    const month = String(isoDate.getMonth() + 1).padStart(2, '0');
    const day = String(isoDate.getDate()).padStart(2, '0');
    const hours = String(isoDate.getHours()).padStart(2, '0');
    const minutes = String(isoDate.getMinutes()).padStart(2, '0');
    const seconds = String(isoDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  // 分頁邏輯處理函式，截取當前頁數應該顯示的項目
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historyList.slice(indexOfFirstItem, indexOfLastItem);

  // 計算總頁數
  const pageNumbers = Math.ceil(historyList.length / itemsPerPage);

  // 處理頁碼改變的函式
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //前往細節頁面
  const handleRowClick = (id, history) => {
    navigate(`/historyOrderDetail/${id}`, { state: { history: history } });
  };

  return (
    <>
      <NavBar />
      <div className='history_container flex flex-col justify-center items-center '>
        <div className='flex justify-center text-3xl font-semibold text-blue my-6'>
          History Order
        </div>
        {historyList.length == 0 ? (
          <div className='flex justify-center w-full font-semibold text-lg text-blue mt-4'>
            No Data{' '}
          </div>
        ) : (
          <div className='overflow-x-auto '>
            <div className='pageChange px-12 flex justify-end'>
              <button
                onClick={() => paginate(currentPage - 1)}
                style={{
                  visibility: currentPage !== 1 ? 'visible' : 'hidden',
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{ color: '#7A989A' }}
                  className='pr-4'
                />
              </button>
              <div className='text-center text-base'>{`${currentPage}`}</div>
              <button
                onClick={() => paginate(currentPage + 1)}
                style={{
                  visibility:
                    currentPage !== pageNumbers ? 'visible' : 'hidden',
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleRight}
                  style={{ color: '#7A989A' }}
                  className='pl-4'
                />
              </button>
            </div>
            <div className='history_table inline-block min-w-full'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-center text-base font-normal text-gray-900'>
                  <thead className='border-b font-semibold text-blue'>
                    <tr>
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
                    {currentItems.map((history, index) => (
                      <tr
                        className='border-b hover:bg-blue hover:text-white cursor-pointer'
                        key={index}
                        onClick={() => handleRowClick(history.oid, history)}
                      >
                        <td className='whitespace-nowrap px-12 py-4'>
                          {dateFormatTransform(history.estimatedArrivalTime)}
                        </td>
                        <td className='whitespace-nowrap px-12 py-4'>
                          {history.rname}
                        </td>
                        <td className='whitespace-nowrap px-12 py-4'>
                          {history.hostName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='pageChange px-12 py-2 flex justify-end'>
              <button
                onClick={() => paginate(currentPage - 1)}
                style={{
                  visibility: currentPage !== 1 ? 'visible' : 'hidden',
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{ color: '#7A989A' }}
                  className='pr-4'
                />
              </button>

              <div className='text-center text-base'>{`${currentPage}`}</div>

              <button
                onClick={() => paginate(currentPage + 1)}
                style={{
                  visibility:
                    currentPage !== pageNumbers ? 'visible' : 'hidden',
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleRight}
                  style={{ color: '#7A989A' }}
                  className='pl-4'
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default History;
