import NavBar from '../components/navbar';
import React, { useState } from 'react';
import '../styles/home.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [oid, setOid] = useState(0);
  const handleKeyDown = (event) => {
    //Todo:
    // add user to order and receive order id
    // suppose order id is 0
    // Add secret key type check
    if (event.key === 'Enter' && inputValue !== '') {
      navigate(`/ordering/${oid}`);
    }
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
          <Link to='/allRestaurant'>
            <button className='bg-blue rounded-3xl w-40 h-14'></button>
          </Link>
          <p className='text-blue text-xl font-bold'>My Restaurant</p>
        </div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <Link to='/friendAndGroup'>
            <button className='bg-brown rounded-3xl w-40 h-14'></button>
          </Link>
          <p className='text-brown text-xl font-bold'>My Friends</p>
        </div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <Link to='/history'>
            <button className='bg-green rounded-3xl w-40 h-14'></button>
          </Link>
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
          <Link to='/createOrder'>
            <button className='bg-blue rounded-3xl w-40 h-14'></button>
          </Link>
          <p className='text-blue text-xl font-bold'>Create Order</p>
        </div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <Link to='/allOrder'>
            <button className='bg-brown rounded-3xl w-40 h-14'></button>
          </Link>
          <p className='text-brown text-xl font-bold'>View Order</p>
        </div>
        <div className='flex items-center flex-col justify-center gap-2'>
          <Link to='/report'>
            <button className='bg-green rounded-3xl w-40 h-14'></button>
          </Link>
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
