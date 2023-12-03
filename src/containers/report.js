import NavBar from '../components/navbar';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReportSuccessMessage from '../components/reportSuccessMessage';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';
import ReportWrittenMessage from '../components/reportWrittenMessage';
const mock_report = [
  {
    id: 0,
    name: 'Harper',
    email: 'Harper@gmail.com',
    title: 'My food is bad.',
    details:
      'My dining experience was exceptionally disappointing, as the quality of the food not only fell below, but starkly deviated from my initially high expectations. The taste was not just unsatisfactory; ...',
    restaurant: 'Morning flavor',
    orderTime: '2023/7/19 12:00',
    host: 'Olivia@gmail.com',
    reportTime: '2023/11/01 12:00',
  },
];
const Report = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const { type, id } = useParams(); //write id: report id and read id: order id
  const [reportWritten, setReportWritten] = useState(false);
  const api = useAxios();
  //check whether type is valid
  useEffect(() => {
    if (type !== 'read' && type !== 'write') {
      navigate('/');
    }
  }, [type, navigate]);
  const [reportData, setReportData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axiosInstance.get(
          `/orderEvent/view?oid=${id}`
        );
        console.log(restaurantResponse);
        console.log(typeof restaurantResponse.data);
        setOrder(restaurantResponse.data);

        if (restaurantResponse.data) {
          if (type === 'read') {
            try {
              const reportResponse = await axiosInstance.get('/getUserReport', {
                params: {
                  uid: user.uid,
                  oid: restaurantResponse.data.id,
                },
              });
              console.log(reportResponse);
              console.log(reportResponse.data[0]);
              console.log(user.uid);
              console.log(restaurantResponse.data.id);
              setReportData([{ details: reportResponse.data[0] }]);
            } catch (error) {
              navigate(`/`);
              console.log('Error fetching report data:', error);
            }
          } else {
            try {
              const reportResponse = await axiosInstance.get('/getUserReport', {
                params: {
                  uid: user.uid,
                  oid: restaurantResponse.data.id,
                },
              });
              if (reportResponse.data !== '') {
                setReportWritten(true);
              }
            } catch (error) {
              navigate(`/`);
              console.log('Error fetching report data:', error);
            }
          }
        }
      } catch (error) {
        navigate(`/`);
        console.log('Error fetching restaurant data:', error);
      }
    };

    fetchData();
  }, [id, type, user.uid]);

  const [order, setOrder] = useState([
    {
      createTime: '2023-12-20T07:50:00.000+00:00',
      endEventTime: '2023-12-02T12:30:00.000+00:00',
      estimatedArrivalTime: '2023-12-01T08:15:00.000+00:00',
      hostID: 1,
      id: 3,
      memberList: null,
      rid: 1,
      rname: 'abcc',
      secretCode: '490147',
      status: 1,
      stopOrderingTime: '2023-12-01T15:30:00.000+00:00',
      totalPeople: 1,
      totalPrice: 0,
    },
  ]);
  const [title, setTitle] = useState('');
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const [details, setDetails] = useState('');
  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };
  const handleBackClick = (id, report) => {
    if (type == 'write') {
      navigate(`/historyOrderDetail/${id}`, { state: { history: report } });
    } else {
      navigate(`/reports`);
    }
  };
  function normalizeTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.005`;
  }
  const handleSendReport = async () => {
    const now = new Date();
    console.log({ type: typeof now });
    console.log(type);
    const res = await api.post(
      '/report',
      JSON.stringify({
        uid: user.uid,
        oid: order.id,
        time: normalizeTime(),
        comment: details,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };
  const handleReportClick = () => {
    handleSendReport();
    setSuccess(true);
    setReportSent(true);
  };
  const dateFormatTransform = (isoDateString) => {
    if (!isoDateString) {
      return 'Invalid Date';
    }
    const date = isoDateString.substring(0, 10);
    const time = isoDateString.substring(11, 16);

    const formattedDate = `${date} ${time}`;
    return formattedDate;
  };
  return (
    <>
      <NavBar />
      <div className='flex p-10 pb-10 pt-4 items-center justify-center'>
        <h2 className='text-blue font-bold text-4xl'>Report Order</h2>
      </div>
      <div className='flex pl-1/8 pr-1/8 items-center justify-center gap-6'>
        <ul>
          <div key={order.id}>
            <div className='p-4 w-180 h-18 items-start grid grid-cols-3 gap-2'>
              <div className='text-center text-blue text-2xl'>
                Restaurant: {order.rname}
              </div>
              {type == 'write' && (
                <div className='text-center text-blue text-2xl'>
                  {dateFormatTransform(order.estimatedArrivalTime)}
                </div>
              )}
              {type == 'read' && (
                <div className='text-center text-blue text-2xl'>
                  {dateFormatTransform(order.estimatedArrivalTime)}
                </div>
              )}
              {type == 'write' && (
                <div className='text-center text-blue text-2xl'>
                  Host: {order.hostID}
                </div>
              )}
              {type == 'read' && (
                <div className='text-center text-blue text-2xl'>
                  Reporter: {order.hostID}
                </div>
              )}
            </div>
          </div>
        </ul>
      </div>
      {type == 'write' && (
        <div>
          <div className='flex items-center'>
            <div className='w-1/6'></div>
            <span className='text-yellow font-bold pr-4 text-2xl'>
              Details:{' '}
            </span>
            <div className='w-1/6'></div>
          </div>
          <div className='flex items-center'>
            <div className='w-1/4'></div>
            <textarea
              className='w-full p-2 border border-yellow border-2 rounded-md'
              placeholder='Enter Details'
              rows='8'
              value={details}
              onChange={handleDetailsChange}
            ></textarea>
            <div className='w-1/4'></div>
          </div>
          <div className='flex pl-2 pr-2 items-center justify-center gap-6'>
            <div className='p-4 w-180 h-18 items-start grid grid-cols-2 gap-2'>
              <div className='flex pl-20 pr-20 items-center justify-center flex-wrap gap-6'>
                <div
                  className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-blue'
                  onClick={() => handleBackClick(id, reportData[0])}
                >
                  <h2 className='pt-2 text-center text-white font-bold text-1xl'>
                    Back
                  </h2>
                </div>
              </div>
              <div className='flex pl-20 pr-20 items-center justify-center flex-wrap gap-6'>
                <div
                  className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-yellow'
                  onClick={() => handleReportClick()}
                >
                  <h2 className='pt-2 text-center text-white font-bold text-1xl'>
                    Report
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {type == 'read' && (
        <div>
          <div className='flex items-center'>
            <div className='w-1/6'></div>
            <span className='text-yellow font-bold pr-4 text-2xl'>
              Details:{' '}
            </span>
            <div className='w-1/6'></div>
          </div>
          <div className='flex items-center'>
            <div className='w-1/4'></div>
            {reportData.map((item) => (
              <div
                key={item.id}
                className='w-full p-2 border border-yellow border-2 rounded-md'
              >
                <div className='pl-2 text-left text-blue text-1xl'>
                  {' '}
                  {item.details}
                </div>
              </div>
            ))}
            <div className='w-1/4'></div>
          </div>
          <div className='flex pl-2 pr-2 items-center justify-center gap-6'>
            <div className='p-4 w-180 h-18 items-start grid grid-cols-1 gap-2'>
              <div className='flex pl-20 pr-20 items-center justify-center flex-wrap gap-6'>
                <div
                  className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-blue'
                  onClick={() => handleBackClick(id, reportData[0])}
                >
                  <h2 className='pt-2 text-center text-white font-bold text-1xl'>
                    Back
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {reportSent && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <ReportSuccessMessage
            success={success}
            setReportSent={setReportSent}
          />
        </div>
      )}
      {reportWritten && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <ReportWrittenMessage setReportWritten={setReportWritten} />
        </div>
      )}
    </>
  );
};
export default Report;
