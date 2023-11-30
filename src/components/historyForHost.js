import React from 'react';
import { Link } from 'react-router-dom';
import HistoryTable from './historyTable';

const HistoryForHost = ({ history, all_order_items }) => {
  console.log(all_order_items);
  return (
    <>
      <div className='history_container flex flex-col justify-center items-center '>
        <div className='flex justify-center text-3xl font-semibold text-blue my-6'>
          Total Order
        </div>
        <div className='order_basic_info flex justify-between my-4 text-gray-900'>
          <div className='px-4'>Order Time: {history.orderTime}</div>
          <div className='px-4'>Restaurant: {history.restaurant}</div>
          <div className='px-4'>Host: Me</div>
        </div>
        <div className='flex flex-col w-full items-center'>
          {all_order_items.map((order_items, index) => (
            <div className='my-4 border-b border-blue pb-4' key={index}>
              <div className='text-blue font-semibold text-lg px-10'>
                Orderer: {order_items.orderer}
              </div>
              <HistoryTable
                order_items={order_items.items}
                totalPrice={order_items.totalPrice}
                notHost={false}
              />
            </div>
          ))}
        </div>
        <div className='buttonContainer my-8'>
          <Link to='/history'>
            <button className='bg-blue hover:bg-red text-white font-bold py-2 px-6 rounded text-center'>
              Back
            </button>
          </Link>
          <Link to='/report/write/0'>
            <button className='bg-yellow hover:bg-green text-white font-bold py-2 px-6 ml-6 rounded text-center'>
              Report
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HistoryForHost;
