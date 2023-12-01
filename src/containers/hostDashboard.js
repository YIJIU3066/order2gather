import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';

const mockGetOrders = {
  totalPrice: 300,
  orders: [
    {
      uid: 1,
      food: [
        {
          fid: 1,
          foodName: '黑糖珍珠',
          num: 1,
          hostViewName: '黑糖珍珠',
          comment: '去冰',
          hostViewPrice: 50,
        },
        {
          fid: 0,
          foodName: '紅茶',
          num: 2,
          hostViewName: '紅茶',
          comment: '大杯微微',
          hostViewPrice: 35,
        },
      ],
      username: 'Walter',
    },
    {
      uid: 3,
      food: [
        {
          fid: 3,
          foodName: '可可歐雷',
          num: 2,
          hostViewName: '可可歐雷',
          comment: null,
          hostViewPrice: 60,
        },
      ],
      username: 'Jesse',
    },
    {
      uid: 4,
      food: [
        {
          fid: 3,
          foodName: '可可歐雷',
          num: 1,
          hostViewName: '可可歐雷',
          comment: 'Hot',
          hostViewPrice: 60,
        },
      ],
      username: 'Gus',
    },
  ],
};

const mockGetInformation = {
  stopOrderingTime: '2023-11-19T13:30:00.000+00:00',
  estimatedArrivalTime: '2023-11-19T16:00:00.000+00:00',
};

const HostDashboard = () => {
  const [deadlineIsEdit, setDeadlineIsEdit] = useState(false);
  const [estimatedIsEdit, setEstimatedIsEdit] = useState(false);
  const [estimated, setEstimated] = useState('');
  const [deadline, setDeadline] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const getFoodList = () => {
    let foods = [];
    for (const uIt of mockGetOrders.orders) {
      for (const fIt of uIt.food) {
        let flag = false;
        for (const existFIt of foods) {
          if (existFIt.foodName === fIt.foodName) {
            flag = true;
            existFIt.Orderers.push({
              uid: uIt.uid,
              note: fIt.comment,
              quantity: fIt.num,
              username: uIt.username,
            });
            break;
          }
        }
        if (!flag) {
          foods.push({
            foodName: fIt.foodName,
            Orderers: [
              {
                uid: uIt.uid,
                note: fIt.comment,
                quantity: fIt.num,
                username: uIt.username,
              },
            ],
            hostViewPrice: fIt.hostViewPrice,
          });
        }
      }
    }
    setFoodList(foods);
  };

  useEffect(() => {
    setEstimated(mockGetInformation.stopOrderingTime);
    setDeadline(mockGetInformation.estimatedArrivalTime);
    setOrderItems(
      mockGetOrders.orders.map((it) => {
        return {
          uid: it.uid,
          username: it.username,
          food: it.food.map((fIt) => ({
            ...fIt,
            isFoodNameEdit: false,
            isPriceEdit: false,
          })),
        };
      })
    );
    getFoodList();
  }, []);

  const handleFoodNameEdit = (uid, fid) => {
    let newOrderList = [];
    orderItems.forEach((it) => {
      if (it.uid !== uid) newOrderList.push(it);
      else {
        let newFoodList = [];
        it.food.forEach((fIt) => {
          if (fIt.fid !== fid) newFoodList.push(fIt);
          else
            newFoodList.push({ ...fIt, isFoodNameEdit: !fIt.isFoodNameEdit });
        });
        newOrderList.push({
          uid: uid,
          username: it.username,
          food: newFoodList,
        });
      }
    });
    setOrderItems((prevList) => newOrderList);
  };

  const handlePriceEdit = (uid, fid) => {
    let newOrderList = [];
    orderItems.forEach((it) => {
      if (it.uid !== uid) newOrderList.push(it);
      else {
        let newFoodList = [];
        it.food.forEach((fIt) => {
          if (fIt.fid !== fid) newFoodList.push(fIt);
          else newFoodList.push({ ...fIt, isPriceEdit: !fIt.isPriceEdit });
        });
        newOrderList.push({
          uid: uid,
          username: it.username,
          food: newFoodList,
        });
      }
    });
    setOrderItems((prevList) => newOrderList);
  };

  const handleFoodNameChange = (e, uid, fid) => {
    let newOrderList = [];
    orderItems.forEach((it) => {
      if (it.uid !== uid) newOrderList.push(it);
      else {
        let newFoodList = [];
        it.food.forEach((fIt) => {
          if (fIt.fid !== fid) newFoodList.push(fIt);
          else newFoodList.push({ ...fIt, foodName: e.target.value });
        });
        newOrderList.push({
          uid: uid,
          username: it.username,
          food: newFoodList,
        });
      }
    });
    setOrderItems((prevList) => newOrderList);
  };

  const handlePriceChange = (e, uid, fid) => {
    let newOrderList = [];
    orderItems.forEach((it) => {
      if (it.uid !== uid) newOrderList.push(it);
      else {
        let newFoodList = [];
        it.food.forEach((fIt) => {
          if (fIt.fid !== fid) newFoodList.push(fIt);
          else newFoodList.push({ ...fIt, hostViewPrice: e.target.value });
        });
        newOrderList.push({
          uid: uid,
          username: it.username,
          food: newFoodList,
        });
      }
    });
    setOrderItems((prevList) => newOrderList);
  };

  const handleFoodNameOnBlur = (e, uid, fid) => {
    handleFoodNameEdit(uid, fid);
    console.log(`uid: ${uid}, fid: ${fid}, newName: ${e.target.value}`);
  };

  const handlePriceOnBlur = (e, uid, fid) => {
    handlePriceEdit(uid, fid);
    console.log(
      `uid: ${uid}, fid: ${fid}, newHostViewPrice: ${e.target.value}`
    );
  };

  const handleInformationOnBlur = () => {
    setDeadlineIsEdit(false);
    setEstimatedIsEdit(false);
    // call /orderEvent/update/:oid
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center'>
        <div className='text-3xl text-blue font-bold p-6'>Host Dashboard</div>
      </div>
      <div className='grid grid-cols-3 lg:px-[30vw] sm:px-[10vw]'>
        <p className='my-4 text-xl text-blue font-bold'>Order Deadline</p>
        {deadlineIsEdit ? (
          <input
            type='text'
            value={deadline}
            onBlur={handleInformationOnBlur}
            onChange={(e) => setDeadline(e.target.value)}
            className='px-1 my-4 w-56 border border-blue border-4 rounded-md focus:outline-none focus:ring-0 col-span-2'
          />
        ) : (
          <div className='my-4 test-xl text-grey col-span-2 flex flex-row items-center gap-4'>
            <p>{deadline}</p>
            <FontAwesomeIcon
              className='cursor-pointer'
              onClick={() => setDeadlineIsEdit(true)}
              icon={faPenToSquare}
              style={{ color: '#dfdfdf' }}
            />
          </div>
        )}

        <p className='my-4 text-xl text-blue font-bold'>Estimated Arrival</p>
        {estimatedIsEdit ? (
          <input
            type='text'
            value={estimated}
            onBlur={handleInformationOnBlur}
            onChange={(e) => setEstimated(e.target.value)}
            className='px-1 my-4 w-56 border border-blue border-4 rounded-md focus:outline-none focus:ring-0 col-span-2'
          />
        ) : (
          <div className='my-4 test-xl text-grey col-span-2 flex flex-row items-center gap-4'>
            <p>{estimated}</p>
            <FontAwesomeIcon
              className='cursor-pointer'
              onClick={() => setEstimatedIsEdit(true)}
              icon={faPenToSquare}
              style={{ color: '#dfdfdf' }}
            />
          </div>
        )}
      </div>
      <div className='lg:px-[30vw] sm:px-[10vw] pt-6'>
        <p className='text-xl text-blue font-bold pb-4'>
          Order Sorted By Orderers
        </p>
        <div className='grid grid-cols-5 place-items-center'>
          <p className='text-lg text-green font-semibold'>Name</p>
          <p className='text-lg text-green font-semibold'>Food</p>
          <p className='text-lg text-green font-semibold'>Note</p>
          <p className='text-lg text-green font-semibold'>Quantity</p>
          <p className='text-lg text-green font-semibold'>Price</p>
        </div>
        <hr className='my-2 h-0.5 border-t-0 bg-grey opacity-20' />
      </div>
      {orderItems.map((it) => {
        return (
          <>
            <div
              key={it.uid}
              className='lg:px-[30vw] sm:px-[10vw] grid grid-cols-5 place-items-center'
            >
              <p>{it.username}</p>
              <div className='flex flex-col items-center gap-1'>
                {it.food.map((foodIt) =>
                  foodIt.isFoodNameEdit ? (
                    <input
                      key={foodIt.fid}
                      value={foodIt.foodName}
                      type='text'
                      onChange={(e) =>
                        handleFoodNameChange(e, it.uid, foodIt.fid)
                      }
                      onBlur={(e) =>
                        handleFoodNameOnBlur(e, it.uid, foodIt.fid)
                      }
                      className='px-1 w-full border border-blue border-2 rounded-md focus:outline-none focus:ring-0'
                    />
                  ) : (
                    <div
                      key={foodIt.fid}
                      className='flex flex-row items-center gap-2'
                    >
                      <p key={foodIt.foodName}>{foodIt.foodName}</p>
                      <FontAwesomeIcon
                        key={foodIt.fid}
                        className='cursor-pointer'
                        onClick={() => handleFoodNameEdit(it.uid, foodIt.fid)}
                        icon={faPenToSquare}
                        style={{ color: '#dfdfdf' }}
                      />
                    </div>
                  )
                )}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.food.map((foodIt) =>
                  foodIt.comment === null ? (
                    <br key={foodIt.comment} />
                  ) : (
                    <p key={foodIt.comment}>{foodIt.comment}</p>
                  )
                )}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.food.map((foodIt) => (
                  <p key={foodIt.num}>{foodIt.num}</p>
                ))}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.food.map((foodIt) =>
                  foodIt.isPriceEdit ? (
                    <input
                      key={foodIt.fid}
                      value={foodIt.hostViewPrice}
                      type='text'
                      onChange={(e) => handlePriceChange(e, it.uid, foodIt.fid)}
                      onBlur={(e) => handlePriceOnBlur(e, it.uid, foodIt.fid)}
                      className='px-1 w-full border border-blue border-2 rounded-md focus:outline-none focus:ring-0'
                    />
                  ) : (
                    <div
                      key={foodIt.fid}
                      className='flex flex-row items-center gap-2'
                    >
                      <p key={foodIt.hostViewPrice}>{foodIt.hostViewPrice}</p>
                      <FontAwesomeIcon
                        key={foodIt.fid}
                        className='cursor-pointer'
                        onClick={() => handlePriceEdit(it.uid, foodIt.fid)}
                        icon={faPenToSquare}
                        style={{ color: '#dfdfdf' }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <hr className='lg:mx-[30vw] sm:mx-[10vw] my-2 h-0.5 border-t-0 bg-grey opacity-20' />
          </>
        );
      })}

      <div className='lg:px-[30vw] sm:px-[10vw] pt-6'>
        <p className='text-xl text-blue font-bold pb-4'>
          Order Sorted By Foods
        </p>
        <div className='grid grid-cols-5 place-items-center'>
          <p className='text-lg text-green font-semibold'>Food</p>
          <p className='text-lg text-green font-semibold'>Name</p>
          <p className='text-lg text-green font-semibold'>Note</p>
          <p className='text-lg text-green font-semibold'>Quantity</p>
          <p className='text-lg text-green font-semibold'>Price</p>
        </div>
        <hr className='my-2 h-0.5 border-t-0 bg-grey opacity-20' />
      </div>
      {foodList.map((it) => {
        return (
          <>
            <div
              key={it.foodname}
              className='lg:px-[30vw] sm:px-[10vw] grid grid-cols-5 place-items-center'
            >
              <p>{it.foodName}</p>
              <div className='flex flex-col items-center gap-1'>
                {it.Orderers.map((orderer) => (
                  <p key={orderer.uid}>{orderer.username}</p>
                ))}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.Orderers.map((orderer) =>
                  orderer.note === null ? (
                    <br key={orderer.note} />
                  ) : (
                    <p key={orderer.note}>{orderer.note}</p>
                  )
                )}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.Orderers.map((orderer) => (
                  <p key={orderer.quantity}>{orderer.quantity}</p>
                ))}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.hostViewPrice}
              </div>
            </div>
            <hr className='lg:mx-[30vw] sm:mx-[10vw] my-2 h-0.5 border-t-0 bg-grey opacity-20' />
          </>
        );
      })}

      <div className='lg:px-[30vw] sm:px-[10vw] flex justify-between items-center py-10'>
        <p className='text-xl text-yellow font-bold'>
          Total Price: ${mockGetOrders.totalPrice}
        </p>
        <button className='bg-red rounded-lg h-14 w-40 text-white text-lg'>
          Order Delivered!
        </button>
      </div>
    </>
  );
};
export default HostDashboard;
