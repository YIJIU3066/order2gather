import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';
import { useLocation } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';

const HostDashboard = () => {
  const [deadlineIsEdit, setDeadlineIsEdit] = useState(false);
  const [estimatedIsEdit, setEstimatedIsEdit] = useState(false);
  const [estimated, setEstimated] = useState('');
  const [deadline, setDeadline] = useState('');
  const [endEventTime, setEndEventTime] = useState('');
  const [OrderEventStatus, setOrderEventStatus] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const oid = parseInt(useLocation().pathname.replace('/hostDashboard/', ''));
  const api = useAxios();
  const { user, logoutUser } = useContext(AuthContext);

  const fetchFoodList = async () => {
    const res = await api.get("/orderEvent/organize", {
      params: {
        oid: oid
      }
    })
    if (res.status === 200) {
      let foods = [];
      for (const uIt of res.data.data.orders) {
        for (const fIt of uIt.food) {
          let flag = false;
          for (const existFIt of foods) {
            if (existFIt.hostViewFoodName === fIt.hostViewFoodName && existFIt.hostViewPrice === fIt.hostViewPrice) {
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
              hostViewFoodName: fIt.hostViewFoodName,
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
      setOrderItems(
        res.data.data.orders.map((it) => {
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
      setTotalPrice(res.data.data.totalPrice);
    }
  }

  const fetchEventInfo = async () => {
    const res = await api.get('/orderEvent/view', {
      params: {
        oid: oid
      }
    });
    if (res.status === 200) {
      setEndEventTime(res.data.endEventTime);
      setOrderEventStatus(res.data.status);
      setDeadline(res.data.stopOrderingTime);
      setEstimated(res.data.estimatedArrivalTime);
    }
  }

  useEffect(() => {
    fetchEventInfo();
    fetchFoodList();
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
          else newFoodList.push({ ...fIt, hostViewFoodName: e.target.value });
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

  const handleFoodNameOnBlur = async (e, uid, food) => {
    handleFoodNameEdit(uid, food.fid);
    if (!e.target.value) {
      fetchFoodList();
      return;
    }
    const res = await api.put("/ordering/modify/host", 
      JSON.stringify({
        uid: uid,
        oid: oid,
        fid: food.fid,
        num: food.num,
        price: food.price,
        hostViewPrice: food.hostViewPrice,
        foodName: food.foodName,
        hostViewFoodName: e.target.value,
        comment: food.comment
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (res.status === 200) {
      fetchFoodList();
    }
  };

  const handlePriceOnBlur = async (e, uid, food) => {
    handlePriceEdit(uid, food.fid);
    if (!e.target.value) {
      fetchFoodList();
      return;
    }
    const res = await api.put("/ordering/modify/host", 
      JSON.stringify({
        uid: uid,
        oid: oid,
        fid: food.fid,
        num: food.num,
        price: food.price,
        hostViewPrice: e.target.value,
        foodName: food.foodName,
        hostViewFoodName: food.hostViewFoodName,
        comment: food.comment
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (res.status === 200) {
      fetchFoodList();
    }
  };

  const handleInformationOnBlur = async () => {
    const res = await api.patch(`/orderEvent/update/${oid}`, 
      JSON.stringify({
        eventId: oid,
        stopOrderingTime: deadline,
        estimatedArrivalTime: estimated,
        endEventTime: endEventTime,
        status: OrderEventStatus
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (res.status === 200) {
      fetchEventInfo();
      setDeadlineIsEdit(false);
      setEstimatedIsEdit(false);
    }
  };

  const handleArrive = async () => {
    if (user === null) logoutUser();
    const time = new Date();
    const res = await api.post('/notify', 
      JSON.stringify({
        uid: user.uid,
        oid: oid,
        comment: "Food arrived, guys!",
        time: time.toString()
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (res.data.status === 'success') alert('Successful Notification!');
    else alert('Oops....Notification Failed...')
  }

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
                      key={foodIt.fid + it.uid * 100000}
                      value={foodIt.hostViewFoodName}
                      type='text'
                      onChange={(e) =>
                        handleFoodNameChange(e, it.uid, foodIt.fid)
                      }
                      onBlur={(e) =>
                        handleFoodNameOnBlur(e, it.uid, foodIt)
                      }
                      className='px-1 w-full border border-blue border-2 rounded-md focus:outline-none focus:ring-0'
                    />
                  ) : (
                    <div
                      key={foodIt.fid + it.uid * 100000}
                      className='flex flex-row items-center gap-2'
                    >
                      <p key={foodIt.hostviewFoodName}>{foodIt.hostViewFoodName}</p>
                      <FontAwesomeIcon
                        key={foodIt.fid + it.uid * 100000}
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
                    <p key={foodIt.fid + it.uid * 100000} >&nbsp;</p>
                  ) : (
                    <p key={foodIt.fid + it.uid * 100000}>{foodIt.comment}</p>
                  )
                )}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.food.map((foodIt) => (
                  <p key={foodIt.fid + it.uid * 100000}>{foodIt.num}</p>
                ))}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.food.map((foodIt) =>
                  foodIt.isPriceEdit ? (
                    <input
                      key={foodIt.fid + it.uid * 100000}
                      value={foodIt.hostViewPrice}
                      type='text'
                      onChange={(e) => handlePriceChange(e, it.uid, foodIt.fid)}
                      onBlur={(e) => handlePriceOnBlur(e, it.uid, foodIt)}
                      className='px-1 w-full border border-blue border-2 rounded-md focus:outline-none focus:ring-0'
                    />
                  ) : (
                    <div
                      key={foodIt.fid + it.uid * 100000}
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
              key={it.hostViewFoodName}
              className='lg:px-[30vw] sm:px-[10vw] grid grid-cols-5 place-items-center'
            >
              <p>{it.hostViewFoodName}</p>
              <div className='flex flex-col items-center gap-1'>
                {it.Orderers.map((orderer) => (
                  <p key={orderer.uid}>{orderer.username}</p>
                ))}
              </div>
              <div className='flex flex-col items-center gap-1'>
                {it.Orderers.map((orderer) =>
                  orderer.note === null ? (
                    <p key={orderer.note} >&nbsp;</p>
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
          Total Price: ${totalPrice}
        </p>
        <button 
          className='bg-red rounded-lg h-14 w-40 text-white text-lg'
          onClick={handleArrive}
        >
          Order Delivered!
        </button>
      </div>
    </>
  );
};
export default HostDashboard;
