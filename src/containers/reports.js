import NavBar from '../components/navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const mock_report_list = [
  {
    id: 0,
    name: 'Harper',
    email: 'Harper@gmail.com',
    title: 'My food is bad.',
    reportTime: '2023-11-01',
  },
  {
    id: 1,
    name: 'Amy',
    email: 'Amy@gmail.com',
    title: 'My food is delicious.',
    reportTime: '2023-11-02',
  },
];
const Reports = () => {
  const navigate = useNavigate();
  const [reportList, setReportList] = useState([]);
  useEffect(() => {
    setReportList(mock_report_list);
  }, []);
  const handleRowClick = (type, id) => {
    // 導航至相應的詳細頁面，假設路由設置為 `/historyOrderDetail/:id`
    navigate(`/report/${type}/${id}`);
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
                      Title
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
                      onClick={() => handleRowClick('read', report.id)}
                    >
                      <td className='whitespace-nowrap px-12 py-4'>
                        {report.name} | {report.email}
                      </td>
                      <td className='whitespace-nowrap px-12 py-4'>
                        {report.title}
                      </td>
                      <td className='whitespace-nowrap px-12 py-4'>
                        {report.reportTime}
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
