import NavBar from '../components/navbar';
import React, { useState, useContext, useEffect } from 'react';
import '../styles/home.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from '../hooks/useAxios';
import WrongCodeMessage from '../components/wrongCodeMessage';

const Home = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [inputValue, setInputValue] = useState('');
  const [oid, setOid] = useState(0);
  const [oidFind, setOidFind] = useState(false);
  const [joinStatus, setJoinStatus] = useState(-2);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const [wrongCodeMessage, setWrongCodeMessage] = useState(false);
  const joinOrder = async () => {
    try {
      const response = await axiosInstance.post(
        `/orderEvent/join?SecretCode=${inputValue}`
      );
      setJoinStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const findoid = async () => {
    try {
      const response = await axiosInstance.get('/orderEvent/view');
      console.log('input', inputValue);
      console.log(response.data);
      for (const item of response.data) {
        if (item.secretCode === inputValue) {
          setOid(item.id);
          setOidFind(true);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (joinStatus >= -1) {
      if (joinStatus >= 0 && oidFind === true) navigate(`/ordering/${oid}`);
      else {
        setJoinStatus(-2);
        setOidFind(false);
        setWrongCodeMessage(true);
      }
    }
  }, [joinStatus, oidFind, navigate, oid]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue !== '') {
      if (isLoggedIn) {
        joinOrder();
        findoid();
      } else {
        navigate(`/login`);
      }
    }
  };
  const handleRestaurantClick = () => {
    if (isLoggedIn) navigate(`/allRestaurant`);
    else navigate(`/login`);
  };
  const handleFriendsClick = () => {
    if (isLoggedIn) navigate(`/friendAndGroup`);
    else navigate(`/login`);
  };
  const handleHistoryClick = () => {
    if (isLoggedIn) navigate(`/history`);
    else navigate(`/login`);
  };
  const handleCreateOrderClick = () => {
    if (isLoggedIn) navigate(`/createOrder`);
    else navigate(`/login`);
  };
  const handleOrderClick = () => {
    if (isLoggedIn) navigate(`/allOrder`);
    else navigate(`/login`);
  };
  const handleReportClick = () => {
    if (isLoggedIn) navigate(`/reports`);
    else navigate(`/login`);
  };

  return (
    <>
      <NavBar />
      <div className='flex p-10 pb-0 pt-4 items-center justify-center'>
        <h2 className='text-blue font-bold text-4xl'>Order 2Gather</h2>
      </div>
      <div className='flex p-10 pt-1 items-center justify-center'>
        <h2 className='text-grey font-bold text-2xl'>Order Together!</h2>
      </div>
      <div className='flex items-center flex-col justify-center mb-20'>
        <div className='bg-green rounded-3xl w-180 h-24'>
          <div className='flex p-10 pt-1 pb-1 items-center justify-around flex-wrap gap-6'>
            <h2 className='text-white font-bold text-2xl pt-5'>
              Joining group to order?
            </h2>
            <div className='bg-white rounded-3xl w-60 h-22 mt-5'>
              <div className='flex p-0 pt-1 items-center justify-around flex-wrap gap-6'>
                <h2 className='text-green font-bold text-2xl ml-2'>#</h2>
                <input
                  type='text'
                  placeholder='Enter code here'
                  className='input mr-2 focus:outline-none'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex p-1 justify-around flex-wrap gap-6'>
        <div></div>
        <div></div>
        <div></div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <button
            onClick={() => handleRestaurantClick()}
            className='bg-blue rounded-3xl w-40 h-14'
          ></button>
          <p className='text-blue text-xl font-bold'>My Restaurant</p>
        </div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <button
            onClick={() => handleFriendsClick()}
            className='bg-brown rounded-3xl w-40 h-14'
          ></button>
          <p className='text-brown text-xl font-bold'>My Friends</p>
        </div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <button
            onClick={() => handleHistoryClick()}
            className='bg-green rounded-3xl w-40 h-14'
          ></button>
          <p className='text-green text-xl font-bold'>Order History</p>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='flex p-1 justify-around flex-wrap gap-6'>
        <div></div>
        <div></div>
        <div></div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <button
            onClick={() => handleCreateOrderClick()}
            className='bg-blue rounded-3xl w-40 h-14'
          ></button>
          <p className='text-blue text-xl font-bold'>Create Order</p>
        </div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <button
            onClick={() => handleOrderClick()}
            className='bg-brown rounded-3xl w-40 h-14'
          ></button>
          <p className='text-brown text-xl font-bold'>View Order</p>
        </div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <button
            onClick={() => handleReportClick()}
            className='bg-green rounded-3xl w-40 h-14'
          ></button>
          <p className='text-green text-xl font-bold'>View Report</p>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {wrongCodeMessage && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <WrongCodeMessage setWrongCodeMessage={setWrongCodeMessage} />
        </div>
      )}
    </>
  );
};
export default Home;
