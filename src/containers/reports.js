import NavBar from '../components/navbar';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';

// const mock_report_list = [
//   {
//     id: 0,
//     name: 'Harper',
//     email: 'Harper@gmail.com',
//     title: 'My food is bad.',
//     reportTime: '2023-11-01',
//   },
//   {
//     id: 1,
//     name: 'Amy',
//     email: 'Amy@gmail.com',
//     title: 'My food is delicious.',
//     reportTime: '2023-11-02',
//   },
// ];

const Reports = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [reportList, setReportList] = useState([]);
  const [historyInfo, setHistoryInfo] = useState();

  useEffect(() => {
    const getAllReport = async () => {
      try {
        const response = await axiosInstance.get('/getAllReport', {
          params: { hid: user.uid },
        });

        setReportList(response.data);
        const allOids = response.data.map((obj) => obj.oid);
        const historyInfoArray = [];

        await Promise.all(
          allOids.map(async (oid) => {
            try {
              const response = await axiosInstance.get('/orderEvent/organize', {
                params: { oid: oid },
              });
              historyInfoArray.push(response.data[0]);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          })
        );
        setHistoryInfo(historyInfoArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllReport();
  }, []);

  useEffect(() => {
    const getAllReport = async () => {
      try {
        const response = await axiosInstance.get('/getAllReport', {
          params: { hid: user.uid },
        });

        setReportList(response.data);
        const allOids = response.data.map((obj) => obj.oid);
        const historyInfoArray = [];

        await Promise.all(
          allOids.map(async (oid) => {
            try {
              const response = await axiosInstance.get('/orderEvent/organize', {
                params: { oid: oid },
              });
              historyInfoArray.push(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          })
        );
        setHistoryInfo(historyInfoArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllReport();
  }, []);

  useEffect(() => {
    const compareAndSetUsername = () => {
      if (historyInfo && reportList) {
        const orders = historyInfo[0]?.orders;
        if (orders) {
          console.log('compare!');
          const updatedReportList = reportList.map((report) => {
            const matchedUser = orders.find(
              (order) => order.uid === report.uid
            );
            if (matchedUser) {
              return { ...report, username: matchedUser.username };
            }
            return report;
          });
          setReportList(updatedReportList);
        }
      }
    };

    compareAndSetUsername();
  }, [historyInfo]);

  const handleRowClick = (type, id) => {
    // 導航至相應的詳細頁面，假設路由設置為 `/historyOrderDetail/:id`
    navigate(`/report/${type}/${id}/${user.uid}`);
  };

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

  return (
    <>
      <NavBar />
      <div className='history_container flex flex-col justify-center items-center '>
        <div className='flex justify-center text-3xl font-semibold text-blue my-6'>
          All Report
        </div>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full py-2'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-center text-base font-normal text-gray-900'>
                <thead className='border-b font-semibold text-blue'>
                  <tr>
                    <th scope='col' className='px-12 py-4'>
                      Report From
                    </th>
                    <th scope='col' className='px-12 py-4'>
                      Comment
                    </th>
                    <th scope='col' className='px-12 py-4'>
                      Report Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.map((report, index) => (
                    <tr
                      className='border-b hover:bg-blue hover:text-white cursor-pointer'
                      key={index}
                      onClick={() => handleRowClick('read', report.oid)}
                    >
                      <td className='whitespace-nowrap px-12 py-4'>
                        {report.username}
                      </td>
                      <td className='whitespace-nowrap px-12 py-4'>
                        {report.comment}
                      </td>
                      <td className='whitespace-nowrap px-12 py-4'>
                        {dateFormatTransform(report.time)}
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
export default Reports;
