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
import AddOrderer from '../components/addOrderer';
import AddRestaurantForm from '../components/addRestaurantForm';

const CreateOrder = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [orderInfo, setOrderInfo] = useState({
    rid: null,
    hostID: null,
    memberList: [],
    createTime: null,
    stopOrderingTime: null,
    estimatedArrivalTime: null,
    endEventTime: null,
    totalPrice: 0,
    totalPeople: 0,
    status: 1,
  });
  const [searchText, setSearchText] = useState('');
  const [restaurantFocus, setRestaurantFocus] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const [friendFocus, setFriendFocus] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [groupFocus, setGroupFocus] = useState(false);

  const inputRef = useRef(null);

  const allOrderer = new Set();

  // 從後端取得目前所有餐廳
  const getAllRestaurant = async () => {
    try {
      const response = await axiosInstance.get('/restaurant/display');
      setRestaurantList(response.data.restaurant);
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }
  };

  // 從後端取得所有朋友
  const getAllFriend = async () => {
    try {
      const response = await axiosInstance.get('/friend/get');
      setFriendList(response.data.friends);
      setGroupList(response.data.groups);

      //加上 checked
      const updatedFriends = response.data.friends.map((friend) => ({
        ...friend,
        checked: false,
      }));
      const updatedGroups = response.data.groups.map((group) => ({
        ...group,
        checked: false,
      }));
      setFriendList(updatedFriends);
      setGroupList(updatedGroups);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  useEffect(() => {
    getAllRestaurant();
    getAllFriend();
  }, []);

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

  const [showRestaurantForm, setShowRestaurantForm] = useState(false);

  const handleAddRestaurant = () => {
    setShowRestaurantForm(true);
  };

  const handleCloseRestaurantForm = () => {
    setShowRestaurantForm(false);
  };

  const convertToFormData = (restaurantString, restaurantInfo, foodString) => {
    const formData = new FormData();
    formData.append('restaurant', restaurantString);
    formData.append('image', restaurantInfo.menus);
    formData.append('food', foodString);
    return formData;
  };

  //儲存
  const handleInputRestantantInfo = async (restaurantInfo) => {
    // 檢查
    const requiredFields = [
      restaurantInfo.restaurant[0]?.name,
      restaurantInfo.restaurant[0]?.phone,
    ];
    const isAllFilled = requiredFields.every(
      (field) => field !== undefined && field.trim() !== ''
    );

    if (isAllFilled) {
      try {
        const restaurantString = JSON.stringify(restaurantInfo.restaurant[0]);
        const foodData = restaurantInfo.food.map(({ name, price }) => ({
          name,
          price,
        }));
        const foodString = JSON.stringify(foodData);
        const restaurantInfoFormData = convertToFormData(
          restaurantString,
          restaurantInfo,
          foodString
        );
        const response = await axiosInstance.post(
          '/restaurant/save',
          restaurantInfoFormData
        );
        getAllRestaurant();
        // setRestaurantList((prevList) => [...prevList, restaurantInfo.restaurant[0]]);
        // setFilteredRestaurants((prevList) => [...prevList, restaurantInfo.restaurant[0]]);
        Swal.fire({
          title: 'Success!',
          text: 'Add Restaurant Succussful!',
          icon: 'success',
          iconColor: '#CF9546',
          confirmButtonColor: '#7A989A',
          confirmButtonText: 'OK!',
        });
        handleCloseRestaurantForm;
      } catch (error) {
        console.error('Error adding restaurant:', error);
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'warning',
        iconColor: '#CF9546',
        showCancelButton: true,
        confirmButtonColor: '#7A989A',
        cancelButtonColor: '#C67052',
        confirmButtonText: 'OK!',
        cancelButtonText: 'Quit Create',
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          console.log('Cancelled!');
          handleCloseRestaurantForm();
        }
      });
    }
  };

  const handleAddFriend = () => {
    if (friendFocus == true) {
      setFriendFocus(false);
    } else {
      setFriendFocus(true);
      setGroupFocus(false);
    }
  };

  const handleAddGroup = () => {
    if (groupFocus == true) {
      setGroupFocus(false);
    } else {
      setGroupFocus(true);
      setFriendFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeRestaurantSearch);
    return () => {
      document.removeEventListener('mousedown', closeRestaurantSearch);
    };
  }, []);

  const countAllOrderer = () => {
    //friend
    if (checkedList.friends) {
      checkedList.friends.forEach((friend) => {
        allOrderer.add(friend.id);
      });
    }

    // group
    if (checkedList.groups) {
      checkedList.groups.forEach((group) => {
        axiosInstance
          .get('friend/getGroupInfo', {
            params: {
              id: group.gid,
            },
          })
          .then((response) => {
            const members = response.data.members;
            members.forEach((member) => {
              allOrderer.add(member.id);
            });
          })
          .catch((error) => {
            console.error('Error fetching data:', error.response);
          });
      });
    }

    allOrderer.add(user.uid);
    const memberList = Array.from(allOrderer);
    const totalPeople = memberList.length;
    return { memberList, totalPeople };
  };

  // 把 order event 資訊存到後端
  const handleSave = async () => {
    const currentTime = getCurrentTime();
    const { memberList, totalPeople } = countAllOrderer();
    if (orderInfo) {
      try {
        const updatedOrderInfo = {
          ...orderInfo,
          hostID: user.uid,
          createTime: currentTime,
          totalPeople: totalPeople,
          memberList: memberList,
        };
        console.log(updatedOrderInfo);
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

  // 選擇餐廳，並加進 Order Info
  const handleChoose = (selected) => {
    setSearchText(selected.name);
    setRestaurantFocus(false);

    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      rid: selected.id,
    }));
  };

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
                    />
                  </label>
                  {restaurantFocus && (
                    <RestaurantSearchBlock
                      searchText={searchText}
                      restaurantList={restaurantList}
                      handleChoose={handleChoose}
                      handleAddRestaurant={handleAddRestaurant}
                    />
                  )}
                </div>
                {showRestaurantForm && (
                  <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100 z-50'>
                    <AddRestaurantForm
                      onClose={handleCloseRestaurantForm}
                      onSave={handleInputRestantantInfo}
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className={`${styles.form_name}`}>Orderers</td>
              <td>
                <div className='relative flex justify-start'>
                  <div className='cursor-pointer flex justify-start items-center'>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: '#7A989A', marginRight: '12px' }}
                    />
                    <div className='buttonContainer'>
                      <button
                        className='bg-blue text-white hover:bg-yellow font-bold py-2 px-5 rounded text-center shadow'
                        onClick={() => handleAddFriend()}
                      >
                        Friend
                      </button>
                      <button
                        className='bg-green text-white hover:bg-yellow font-bold py-2 px-5 ml-5 rounded text-center shadow'
                        onClick={() => handleAddGroup()}
                      >
                        Group
                      </button>
                    </div>
                  </div>
                  {friendFocus && (
                    <AddOrderer
                      friendList={friendList}
                      setFriendList={setFriendList}
                      checkedList={checkedList}
                      setCheckedList={setCheckedList}
                    />
                  )}
                  {groupFocus && (
                    <AddOrderer
                      groupList={groupList}
                      setGroupList={setGroupList}
                      checkedList={checkedList}
                      setCheckedList={setCheckedList}
                    />
                  )}
                </div>
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
          {/* <button
            className='bg-red hover:bg-yellow text-white font-bold py-2 px-3 ml-6 rounded text-center'
            onClick={() => handleDelete()}
          >
            Delete
          </button> */}
        </div>
      </div>
    </>
  );
};
export default CreateOrder;
