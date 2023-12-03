import NavBar from '../components/navbar';
import React, { useState, useEffect, useContext } from 'react';
import OrderingSuccessMessage from '../components/orderingMessage';
import Showmenu from '../components/showMenu';
import OrderingEmptyMessage from '../components/orderingEmptyMessage';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const Ordering = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [addFood, setAddFood] = useState(0);
  const [confirmOrder, setConfirmOrder] = useState(0);
  const [emptyMessage, setEmptyMessage] = useState(false);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [Order, setOrder] = useState({
    id: 0,
    rname: 'Restaurant AAAA',
    stopOrderingTime: '2023-07-29 10:00',
    host: 'Host 1',
  });
  const [menu, setMenu] = useState('');
  const dateFormatTransform = (isoDateString) => {
    const date = isoDateString.substring(0, 10);
    const time = isoDateString.substring(11, 16);

    const formattedDate = `${date} ${time}`;
    return formattedDate;
  };
  //const [Order, setOOrder] = useState([]);
  const mockOrder = {
    id: 0,
    restaurant: 'Restaurant AAAA',
    openDeadline: '2023-07-29 10:00',
    deliverTime: '2023-07-29 12:00',
    host: 'Host 1',
  };

  const [foodList, setFoodList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/orderEvent/view?oid=${id}`);
        //console.log(response.data);
        setOrder(response.data);
        const responseRestaurant = await axiosInstance.get(
          `/restaurant/display?rid=${response.data.rid}`
        );
        console.log(typeof responseRestaurant.data);
        console.log(responseRestaurant.data);
        //const parsedData = JSON.parse(responseRestaurant.data);
        //console.log(parsedData.food)
        //console.log(typeof responseRestaurant.data);
        //console.log(responseRestaurant.data.food);
        setMenu(responseRestaurant.data.menu);
        //console.log(responseRestaurant.data.menu);
        setFoodList(
          responseRestaurant.data.food.map((food) => ({
            ...food,
            note: '',
            quantity: 0,
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchData = async () => {
      await getOrderDetails();
    };

    fetchData();
  }, []); // 移除 foodList 作為依賴陣列，確保只在剛進入頁面時執行
  useEffect(() => {
    // 在 foodList 變更時執行 calculateTotalPrice
    const calculateTotalPrice = () => {
      const totalPrice = foodList.reduce((accumulator, food) => {
        const price = parseInt(food.price, 10);
        const quantity = food.quantity;
        return accumulator + price * quantity;
      }, 0);
      setTotalPrice(totalPrice);
    };
    calculateTotalPrice();
  }, [foodList]);
  const [newFood, setNewFood] = useState([
    {
      id: 0,
      name: '',
      price: '',
    },
  ]);
  const handleNoteChange = (id, newNote) => {
    if (newNote.length < 20) {
      const updatedFoodList = foodList.map((food) =>
        food.id === id ? { ...food, note: newNote } : food
      );
      setFoodList(updatedFoodList);
    }
  };
  const handleDecreaseClick = (id) => {
    setFoodList((prevFoodList) => {
      const updatedFoodList = prevFoodList.map((food) => {
        if (food.id === id) {
          const newQuantity = Math.max(0, food.quantity - 1);
          return { ...food, quantity: newQuantity };
        }
        return food;
      });
      return updatedFoodList;
    });
  };
  const handleIncreaseClick = (id) => {
    setFoodList((prevFoodList) => {
      const updatedFoodList = prevFoodList.map((food) => {
        if (food.id === id) {
          const newQuantity = food.quantity + 1;
          return { ...food, quantity: newQuantity };
        }
        return food;
      });
      return updatedFoodList;
    });
  };
  const handleNewFoodNameChange = (id, newName) => {
    const updatedNewFood = newFood.map((food) =>
      food.id === id ? { ...food, name: newName } : food
    );
    setNewFood(updatedNewFood);
  };
  const handleNewFoodPriceChange = (id, newPrice) => {
    const parsedPrice = newPrice.trim() === '' ? '' : parseInt(newPrice, 10);
    if (parsedPrice === '') {
      const updatedNewFood = newFood.map((food) =>
        food.id === id ? { ...food, price: parsedPrice } : food
      );
      setNewFood(updatedNewFood);
    } else if (!isNaN(parsedPrice)) {
      const updatedNewFood = newFood.map((food) =>
        food.id === id ? { ...food, price: parsedPrice } : food
      );
      setNewFood(updatedNewFood);
    } else {
      console.error('Invalid price input.');
    }
  };
  const deleteNewItemClick = (id) => {
    const updatedNewFood = newFood.map((food) =>
      food.id === id ? { ...food, name: '', price: '' } : food
    );
    setNewFood(updatedNewFood);
    setAddFood(0);
  };
  const addNewItemClick = () => {
    if (newFood[0].name !== '' && newFood[0].price !== '') {
      const newFoodItem = {
        id: foodList.length,
        name: newFood[0].name,
        price: newFood[0].price,
        note: '',
        quantity: 1,
      };

      setFoodList((prevFoodList) => [...prevFoodList, newFoodItem]);
      setNewFood([{ id: 0, name: '', price: '' }]);
      setAddFood(0);
    }
  };
  const handleAddItemClick = () => {
    setAddFood(1);
  };
  const handleOrderClick = () => {
    if (totalPrice == 0) {
      setEmptyMessage(true);
    } else {
      setConfirmOrder(1);
    }
  };
  const handleModifyClick = () => {
    setConfirmOrder(0);
  };
  const handleConfirmClick = () => {
    //TODO: sent order to backend
    setSuccess(true);
    setConfirmOpen(1);
  };
  const handleMenuClick = () => {
    if (menu && menu.length > 0) {
      // The menu array is not empty
      setMenuOpen(true);
    }
  };
  return (
    <>
      <NavBar />
      <div className='flex p-10 pb-10 pt-4 items-center justify-center'>
        <h2 className='text-blue font-bold text-4xl'>Order</h2>
      </div>
      <div className='flex pl-20 pr-20 items-center justify-center flex-wrap gap-6'>
        {confirmOrder === 0 && (
          <>
            <h2 className='text-blue font-bold text-2xl'>{Order.rname}</h2>
            <h2 className='text-blue font-bold text-1xl flex-grow'>
              Deadline: {dateFormatTransform(Order.stopOrderingTime)}
            </h2>
            <div
              className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-yellow'
              key={Order.id}
              onClick={() => handleMenuClick()}
            >
              <h2 className='pt-2 text-center text-white font-bold text-1xl'>
                Menu
              </h2>
            </div>
          </>
        )}
        {confirmOrder === 1 && (
          <>
            <h2 className='text-blue font-bold text-2xl flex-grow'>
              {Order.restaurant}
            </h2>
          </>
        )}
      </div>
      <div className='flex pl-2 pr-2 items-center justify-center gap-6'>
        <ul>
          <div className='p-4 w-180 h-18 items-start grid grid-cols-4 gap-2'>
            <div className='text-center'>Name</div>
            <div className='text-center'>Price</div>
            <div className='text-center'>Note</div>
            <div className='text-center'>Quantity</div>
          </div>
          {foodList.map(
            (food) =>
              (food.quantity !== 0 || confirmOrder === 0) && ( //on order or on check w/ quantity > 0
                <div
                  key={food.id}
                  className='p-4 mb-4 w-180 h-18 items-start bg-lightgrey grid grid-cols-4 gap-2 rounded-2xl'
                >
                  <span className='p-2 text-center'>{food.name}</span>
                  <span className='p-2 text-center'>${food.price}</span>
                  {confirmOrder === 1 ? (
                    <>
                      <span className='p-2 text-center'>{food.note}</span>
                    </>
                  ) : (
                    <input
                      className='p-2 text-center border border-blue border-2 rounded-2xl'
                      type='text'
                      value={food.note}
                      onChange={(e) =>
                        handleNoteChange(food.id, e.target.value)
                      }
                    />
                  )}
                  {confirmOrder === 0 ? (
                    <div className='flex items-center justify-center'>
                      <button
                        className='p-2 text-center'
                        onClick={() => handleDecreaseClick(food.id)}
                      >
                        -
                      </button>
                      <span className='p-2 text-center border border-blue border-2 rounded-2xl'>
                        {food.quantity}
                      </span>
                      <button
                        className='p-2 text-center'
                        onClick={() => handleIncreaseClick(food.id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span className='p-2 text-center'>{food.quantity}</span>
                  )}
                </div>
              )
          )}
          {confirmOrder === 0 && (
            <>
              {addFood === 1 &&
                newFood.map((food) => (
                  <div
                    key={food.id}
                    className='p-4 mb-4 w-180 h-18 items-start bg-lightgrey grid grid-cols-4 gap-2 rounded-2xl'
                  >
                    <input
                      className='p-2 text-center border border-blue border-2 rounded-2xl'
                      type='text'
                      value={food.name}
                      onChange={(e) =>
                        handleNewFoodNameChange(food.id, e.target.value)
                      }
                    />
                    <input
                      className='p-2 text-center border border-blue border-2 rounded-2xl'
                      type='text'
                      value={food.price}
                      onChange={(e) =>
                        handleNewFoodPriceChange(food.id, e.target.value)
                      }
                    />
                    <span className='p-2 text-center'></span>
                    <div className='flex items-center justify-center'>
                      <div
                        className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-10 h-10 bg-red'
                        key={Order.id}
                        onClick={() => deleteNewItemClick(Order.id)}
                      >
                        <h2 className='text-center text-white font-bold text-1xl'>
                          ✕
                        </h2>
                      </div>
                      <span className='p-2 text-center'></span>
                      <div
                        className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-10 h-10 bg-green'
                        key={Order.id}
                        onClick={() => addNewItemClick(Order.id)}
                      >
                        <h2 className='text-center text-white font-bold text-1xl'>
                          ✓
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              <div className='p-4 pt-1 w-180 h-18 items-start grid grid-cols-2 gap-2'>
                <div className='flex items-center justify-center'>
                  <div
                    className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-10 h-10'
                    key={Order.id}
                    onClick={() => handleAddItemClick(Order.id)}
                  >
                    <h2 className='text-center text-black font-bold text-4xl'>
                      +
                    </h2>
                  </div>
                  <h2 className='text-grey pl-4 font-bold text-1xl flex-grow'>
                    {`Can't find your meal? Add a new one!`}
                  </h2>
                </div>
              </div>
            </>
          )}
          {confirmOrder === 1 && (
            <div className='p-4 pt-0 w-180 h-18 items-start grid grid-cols-4 gap-2'>
              <div></div>
              <div></div>
              <div></div>
              <div className='flex items-center justify-center'>
                <div className='text-center text-blue font-bold'>Total:</div>
                <div className='text-center text-blue font-bold underline'>
                  ${totalPrice}
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
      {confirmOrder === 0 && (
        <div className='flex pl-20 pr-20 items-center justify-center flex-wrap gap-6'>
          <div
            className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-yellow'
            key={Order.id}
            onClick={() => handleOrderClick()}
          >
            <h2 className='pt-2 text-center text-white font-bold text-1xl'>
              Order
            </h2>
          </div>
        </div>
      )}
      {confirmOrder === 1 && (
        <div className='flex pl-2 pr-2 items-center justify-center gap-6'>
          <div className='p-4 w-180 h-18 items-start grid grid-cols-2 gap-2'>
            <div className='flex pl-20 pr-20 items-center justify-center flex-wrap gap-6'>
              <div
                className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-blue'
                onClick={() => handleModifyClick()}
              >
                <h2 className='pt-2 text-center text-white font-bold text-1xl'>
                  Modify
                </h2>
              </div>
            </div>
            <div className='flex pl-20 pr-20 items-center justify-center flex-wrap gap-6'>
              <div
                className='border-b hover:text-white cursor-pointer pl-2 pr-2 w-40 h-10 rounded-2xl bg-yellow'
                onClick={() => handleConfirmClick()}
              >
                <h2 className='pt-2 text-center text-white font-bold text-1xl'>
                  Confirm
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
      {confirmOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <OrderingSuccessMessage
            success={success}
            setConfirmOpen={setConfirmOpen}
          />
        </div>
      )}
      {menuOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <Showmenu
            menuid={Order.id}
            setMenuOpen={setMenuOpen}
            menu_photo={menu}
          />
        </div>
      )}
      {emptyMessage && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <OrderingEmptyMessage setEmptyMessage={setEmptyMessage} />
        </div>
      )}
    </>
  );
};
export default Ordering;
