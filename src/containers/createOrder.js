import React, { useEffect, useState, useContext, useRef } from 'react';
import NavBar from '../components/navbar';
import Picker from '../components/dateTimePicker';
import RestaurantSearchBlock from '../components/restaurantSearchBlock';
import styles from '../styles/form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

const CreateOrder = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  //rid, totalPeople 還要改!
  const [orderInfo, setOrderInfo] = useState({
    rid: 2,
    hostID: null,
    // memberList: [],
    memberList: [6],
    createTime: null,
    stopOrderingTime: null,
    estimatedArrivalTime: null,
    endEventTime: null,
    totalPrice: 0,
    // totalPeople: null,
    totalPeople: 2,
    status: 1,
  });

  const [searchText, setSearchText] = useState('');
  const [restaurantFocus, setRestaurantFocus] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const openRestaurantSearch = () => {
    setRestaurantFocus(true);
  };

  const closeRestaurantSearch = (event) => {
    if (!inputRef.current.contains(event.target)) {
      setRestaurantFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeRestaurantSearch);
    return () => {
      document.removeEventListener('mousedown', closeRestaurantSearch);
    };
  }, []);

  //獲得目前時間
  const getCurrentTime = () => {
    const currentTime = new Date();

    const utcOffset = -8 * 60;
    const adjustedDate = new Date(currentTime.getTime() + utcOffset * 60000);
    const formattedDate = adjustedDate.toISOString().slice(0, 19);

    return formattedDate;
  };

  // 設定order event 預設資訊
  useEffect(() => {
    const currentTime = getCurrentTime();

    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      stopOrderingTime: currentTime,
      estimatedArrivalTime: currentTime,
      endEventTime: currentTime,
    }));
  }, []);

  const handleSave = async () => {
    const currentTime = getCurrentTime();

    if (orderInfo) {
      try {
        const updatedOrderInfo = {
          ...orderInfo,
          hostID: user.uid,
          createTime: currentTime,
        };

        const response = await axiosInstance.post(
          '/orderEvent/create',
          updatedOrderInfo
        );
        const secretCode = response.data.SecretCode;
        Swal.fire({
          title: `Secret Code: ${secretCode}`,
          text: 'Create Success! Share the Code to Invite Member',
          icon: 'success',
          iconColor: '#CF9546',
          confirmButtonColor: '#7A989A',
        });
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
  };

  const handleDelete = () => {
    // console.log('handleDelete');
  };

  const handleChoose = (selected) => {
    setSearchText(selected);
    setRestaurantFocus(false);
  };

  // useEffect(() => {
  //   console.log(orderInfo);
  // }, [orderInfo]);

  return (
    <>
      <NavBar />
      <div className='flex justify-center text-3xl font-semibold text-blue my-6'>
        ORDER EVENT
      </div>

      <div className='createOrderSetting text-lg my-10 mx-14 flex flex-col items-center'>
        <table className='table-auto'>
          <tbody>
            <tr className='border-b'>
              <td className={`${styles.form_name}`}>Order Deadline</td>
              <td>
                <Picker
                  setOrderInfo={setOrderInfo}
                  timetype='stopOrderingTime'
                />
              </td>
            </tr>
            <tr className='border-b'>
              <td className={`${styles.form_name}`}>Estimated Arrival</td>
              <td>
                <Picker
                  setOrderInfo={setOrderInfo}
                  timetype='estimatedArrivalTime'
                />
              </td>
            </tr>
            <tr className='border-b'>
              <td className={`${styles.form_name}`}>Order End</td>
              <td>
                <Picker setOrderInfo={setOrderInfo} timetype='endEventTime' />
              </td>
            </tr>
            <tr className='border-b'>
              <td className={`${styles.form_name}`}>Restaurant</td>
              <td>
                <div
                  className='relative flex items-start justify-center'
                  ref={inputRef}
                >
                  <label className='cursor-pointer'>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{ color: '#7A989A', marginRight: '12px' }}
                    />
                    <input
                      className={`${styles.form_input}`}
                      placeholder='Search a Restaurant...'
                      value={searchText}
                      onChange={handleInputChange}
                      onFocus={openRestaurantSearch}
                      // ref={inputRef}
                    />
                  </label>
                  {restaurantFocus && (
                    <div
                    // onClick={handleClickInside}
                    >
                      <RestaurantSearchBlock
                        searchText={searchText}
                        handleChoose={handleChoose}
                      />
                    </div>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className={`${styles.form_name}`}>Orderers</td>
              <td>
                <label className='cursor-pointer'>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: '#7A989A', marginRight: '12px' }}
                  />
                  <input
                    className={`${styles.form_input}`}
                    placeholder='Add Group or Friends'
                  />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='buttonContainer mt-8'>
          <button
            className='bg-yellow hover:bg-green text-white font-bold py-2 px-3 rounded text-center'
            onClick={() => handleSave()}
          >
            Save & Launch
          </button>
          <button
            className='bg-red hover:bg-yellow text-white font-bold py-2 px-3 ml-4 rounded text-center'
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
export default CreateOrder;
