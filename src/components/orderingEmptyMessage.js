import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmptyMessage({ setEmptyMessage }) {
  const navigate = useNavigate();
  const handleClose = () => {
    setEmptyMessage(false);
  };

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='md:w-1/3 sm:w-2/3 border-8 border-blue p-4 rounded shadow flex flex-col items-center bg-slate-50 relative'>
        <div className='grid grid-cols-3 w-4/5 gap-3 my-4 items-center'>
          <h2 className='text-2xl text-blue font-bold my-2 mr-auto col-span-2'></h2>
          <button
            onClick={handleClose}
            className='text-3xl right-3 top-2 text-blue justify-self-end'
          >
            X
          </button>
          <div></div>
        </div>
        <p className='text-lg text-blue text-2xl'>
          The cart is empty! Please try again!
        </p>
        <div className='grid grid-cols-3 w-4/5 gap-3 my-4 items-center'>
          <div></div>
          <div></div>
          <button
            onClick={handleSubmit}
            className='text-center bg-blue text-white text-xl py-1.5 px-5 rounded-md'
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
