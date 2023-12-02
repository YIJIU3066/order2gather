import NavBar from '../components/navbar';
import React, { useState, useContext } from 'react';
import '../styles/home.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from '../hooks/useAxios';

const Home = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [inputValue, setInputValue] = useState('');
  const [oid, setOid] = useState(0);
  const [joinStatus, setJoinStatus] = useState(-1);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const handleKeyDown = (event) => {
    //Todo:
    // add user to order and receive order id
    // suppose order id is 0
    // Add secret key type check
    const joinOrder = async () => {
      try {
        const response = await axiosInstance.post(
          '/orderEvent/join?SecretCode={inputValue}'
        );
        console.log(response);
        console.log(response.data.status);
        setJoinStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (event.key === 'Enter' && inputValue !== '') {
      if (isLoggedIn) {
        joinOrder();
        if (joinStatus <= 0) {
        } else {
          navigate(`/ordering/${oid}`);
        }
      } else navigate(`/login`);
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
      <div>
        isloggedin {isLoggedIn === true} {logoutUser} a
      </div>
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
                  className='input mr-2'
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
    </>
  );
};
export default Home;
