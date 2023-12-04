import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import styles from '../styles/form.module.css';
import styles_img from '../styles/addRestaurant.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faXmark,
  faAngleRight,
  faAngleLeft,
  faPenToSquare,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';
import ImageDisplay from '../components/imageDisplay';

const RestaurantDetail = () => {
  const location = useLocation();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { restaurant } = location.state || {};
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [menus, setMenus] = useState([]);
  const [menuURLs, setMenuURLs] = useState([]);
  const fileInputRef = useRef(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [addFood, setAddFood] = useState(false);
  const [deleteFood, setDeleteFood] = useState(false);
  const [newFood, setNewFood] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [showNumTip, setShowNumTip] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  //從後端拿餐廳資料
  const getRestaurantInfo = async () => {
    try {
      const response = await axiosInstance.get('/restaurant/display', {
        params: { rid: restaurant.id },
      });
      setRestaurantInfo({
        menu: response.data.menu,
        restaurant: response.data.restaurant,
        food: response.data.food,
      });

      const newImageUrls = response.data.menu.map((menuString) =>
        convertStringToImage(menuString)
      );
      setMenuURLs(newImageUrls);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getRestaurantInfo();
  }, []);

  //圖片
  useEffect(() => {
    if (menus.length < 1) return;

    // Create new image URLs from the menus
    const newImageUrls = menus.map((menu) => URL.createObjectURL(menu));
    setMenuURLs((prevMenuURLs) => prevMenuURLs.concat(newImageUrls));

    // Clean up previous image URLs when menus change
    return () => {
      menus.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [menus]);

  //圖片字串轉換為Blob
  const convertStringToImage = (stringData) => {
    const byteArray = Uint8Array.from(atob(stringData), (c) => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  //圖片Blob轉換為字串
  const convertBlobToString = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const text = event.target.result;
        resolve(text);
      };
      reader.onerror = function (event) {
        reject(new Error('Error reading blob as text'));
      };
      reader.readAsDataURL(blob);
    });
  };

  // 選擇圖片
  const handleMenuChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        setMenus([...menus, file]);
        const imageDataString = await convertBlobToString(file);
        const base64ImageData = imageDataString.split(',')[1];
        setRestaurantInfo((prevRestaurantInfo) => {
          return {
            ...prevRestaurantInfo,
            menu: [...prevRestaurantInfo.menu, base64ImageData],
          };
        });
        // handleSaveImg(base64ImageData);
        handleSaveImg(file);
      } catch (error) {
        console.error('Error converting image blob to string:', error);
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please select an image file',
        icon: 'error',
        iconColor: '#CF9546',
        confirmButtonColor: '#7A989A',
        confirmButtonText: 'OK',
      });
    }
  };

  // 上傳圖片
  const handleMenuUpload = () => {
    fileInputRef.current.click();
    if (menus) {
      console.log('Selected File:', menus);
    } else {
      console.log('Please select a file.');
    }
  };

  //刪除圖片
  const handleDeleteMenu = (indexToDelete) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this menu?',
      icon: 'warning',
      iconColor: '#CF9546',
      showCancelButton: true,
      confirmButtonColor: '#7A989A',
      cancelButtonColor: '#C67052',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedMenus = [...menus];

        updatedMenus.splice(indexToDelete, 1);
        setMenus(updatedMenus);

        const updatedMenuURLs = [...menuURLs];
        URL.revokeObjectURL(updatedMenuURLs[indexToDelete]);
        updatedMenuURLs.splice(indexToDelete, 1);

        setMenuURLs(updatedMenuURLs);

        const remainMenus = restaurantInfo.menu.filter(
          (_, index) => index !== indexToDelete
        );

        setRestaurantInfo((prevRestaurantInfo) => ({
          ...prevRestaurantInfo,
          menu: remainMenus,
        }));

        Swal.fire({
          title: 'Deleted!',
          text: 'Your menu has been deleted.',
          icon: 'success',
          iconColor: '#CF9546',
          confirmButtonColor: '#7A989A',
        });
      }
    });
  };

  //刪除不能用!
  // useEffect(() => {
  //   handleSave();
  // }, [handleDeleteMenu]);

  //轉換資料格式
  const convertToFormData = (restaurantString, restaurantInfo, foodString) => {
    const formData = new FormData();
    console.log(foodString);
    console.log(restaurantString);
    formData.append('restaurant', restaurantString);
    formData.append('menu', restaurantInfo.menus);
    formData.append('food', foodString);
    return formData;
  };

  // 儲存資料
  const handleSave = async () => {
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

      const response = await axiosInstance.put(
        '/restaurant/update',
        restaurantInfoFormData
      );
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'Edit Restaurant Success!.',
        icon: 'success',
        iconColor: '#CF9546',
        confirmButtonColor: '#7A989A',
      });
    } catch (error) {
      console.log(`Update Restaurant Data Error, ${error}`);
    }
  };

  // 儲存圖片
  const handleSaveImg = async (uploadImg) => {
    try {
      const restaurantString = JSON.stringify(restaurantInfo.restaurant[0]);
      const foodData = restaurantInfo.food.map(({ name, price }) => ({
        name,
        price,
      }));
      const foodString = JSON.stringify(foodData);
      const formData = new FormData();
      formData.append('restaurant', restaurantString);
      formData.append('menu', uploadImg); // Add the image file directly to FormData
      formData.append('food', foodString);

      const response = await axiosInstance.put('/restaurant/update', formData);
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'Edit Restaurant Success!',
        icon: 'success',
        iconColor: '#CF9546',
        confirmButtonColor: '#7A989A',
      });
    } catch (error) {
      console.log(`Update Restaurant Data Error, ${error}`);
    }
  };

  const handleDelete = async () => {
    console.log('handleDelete');
    try {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this restaurant?',
        icon: 'warning',
        iconColor: '#CF9546',
        showCancelButton: true,
        confirmButtonColor: '#7A989A',
        cancelButtonColor: '#C67052',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
      if (confirmation.isConfirmed) {
        const response = await axiosInstance.delete('/restaurant/delete', {
          params: {
            rid: restaurant.id,
          },
        });
        console.log(response);
        Swal.fire({
          title: 'Deleted!',
          text: 'Restaurant has been deleted.',
          icon: 'success',
          iconColor: '#CF9546',
          confirmButtonColor: '#7A989A',
        });
        navigate('/allRestaurant');
      } else {
        // User clicked Cancel or outside the modal
        console.log('Deletion canceled');
      }
    } catch (error) {
      console.log('Delete Restaurant Error!', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the restaurant.',
        icon: 'error',
        iconColor: '#CF9546',
        confirmButtonColor: '#7A989A',
      });
    }
  };

  //修改資料
  const handleChangeRestantantInfo = (e, type) => {
    const updatedValue = e.target.textContent;
    setRestaurantInfo((prevRestaurantInfo) => ({
      ...prevRestaurantInfo,
      restaurant: [
        {
          ...prevRestaurantInfo.restaurant[0],
          [type]: updatedValue,
        },
      ],
    }));
  };

  //修改食物資料
  const handleChangeFoodInfo = (e, id, type) => {
    const updatedValue = e.target.textContent;

    setRestaurantInfo((prevRestaurantInfo) => {
      const updatedFood = prevRestaurantInfo.food.map((foodItem) => {
        if (foodItem.id === id) {
          return {
            ...foodItem,
            [type]: updatedValue,
          };
        }
        return foodItem;
      });

      return {
        ...prevRestaurantInfo,
        food: updatedFood,
      };
    });
  };

  const handleShowAddFood = () => {
    if (addFood == true) {
      setAddFood(false);
    } else {
      setAddFood(true);
    }
  };

  const handleAddFood = () => {
    const numNewPrice = parseFloat(newPrice);
    if (typeof numNewPrice === 'number' && newFood !== '') {
      setRestaurantInfo((prevRestaurantInfo) => {
        const newFoodItem = {
          // rid: restaurant.id,
          name: newFood,
          price: numNewPrice,
        };

        const updatedFood = [...prevRestaurantInfo.food, newFoodItem];

        return {
          ...prevRestaurantInfo,
          food: updatedFood,
        };
      });

      setNewFood('');
      setNewPrice('');
    } else {
      setShowNumTip(true);
    }
  };

  const handleShowDeleteFood = () => {
    if (deleteFood == false) {
      setDeleteFood(true);
    } else {
      setDeleteFood(false);
    }
    // /restaurant/deleteFood
  };

  //處理刪除中被選中的項目
  const handleCheckboxChange = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };
  // 處理刪除食物
  const handleDeleteFood = async () => {
    const updatedFoodList = restaurantInfo.food.filter(
      (foodItem, index) => !selectedItems.includes(foodItem.id)
    );

    setRestaurantInfo((prevRestaurantInfo) => ({
      ...prevRestaurantInfo,
      food: updatedFoodList,
    }));
    for (const deleteFood of selectedItems) {
      try {
        const response = await axiosInstance.delete('/restaurant/deleteFood', {
          params: { rid: restaurant.id, fid: deleteFood },
        });
        console.log('Food Deleted:', response);
      } catch (error) {
        console.log('Failed to Delete Food', error);
      }
    }
  };

  if (!restaurant) {
    return <div>No restaurant data found</div>;
  }

  useEffect(() => {
    if (restaurantInfo) {
      console.log(restaurantInfo);
    }
  }, [restaurantInfo]);
  return (
    <>
      <NavBar />
      {restaurantInfo && (
        <div className='restaurant_detail_container flex flex-col justify-center overflow-auto'>
          <div className='w-full flex items-center justify-center'>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: '#7A989A' }}
              size='lg'
            />
            <div
              onInput={(e) => handleChangeRestantantInfo(e, 'name')}
              contentEditable='true'
              suppressContentEditableWarning={true}
              className='ml-2 my-6 flex justify-center text-3xl text-blue font-semibold border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-blue'
            >
              {restaurant?.name}
            </div>
          </div>
          <div className='input_container text-lg mt-4  flex flex-col items-center overflow-x-auto overflow-y-auto h-1/2 w-[95%]'>
            <table className=''>
              <tbody>
                <tr className='border-b'>
                  <td className={`${styles.form_name}`}>Address</td>
                  <td className={`${styles.form_content}`}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: '#7A989A' }}
                      size='sm'
                    />
                    <div
                      onInput={(e) => handleChangeRestantantInfo(e, 'address')}
                      contentEditable='true'
                      suppressContentEditableWarning={true}
                      className='ml-2 text-blue font-semibold border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-blue'
                    >
                      {restaurant?.address}
                    </div>
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className={`${styles.form_name}`}>Telephone</td>
                  <td className={`${styles.form_content}`}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: '#7A989A' }}
                      size='sm'
                    />
                    <div
                      onInput={(e) => handleChangeRestantantInfo(e, 'phone')}
                      contentEditable='true'
                      suppressContentEditableWarning={true}
                      className='ml-2 text-blue font-semibold border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-blue'
                    >
                      {restaurant?.phone}
                    </div>
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className={`${styles.form_name}`}>Food</td>
                  <td className='py-4 flex flex-row'>
                    <ul className='food_container flex flex-col'>
                      {restaurantInfo?.food.map((foodItem, index) => (
                        <li
                          key={index}
                          className='pl-4 text-blue font-semibold flex flex-row items-center'
                        >
                          {deleteFood && (
                            <div>
                              <label
                                className='cursor-pointer flex items-center justify-center'
                                id={`food_${foodItem.id}`}
                              />
                              <input
                                id={`food_${foodItem.id}`}
                                type='checkbox'
                                checked={selectedItems.includes(foodItem.id)}
                                className='appearance-none w-4 h-4 mx-2 rounded focus:outline-none border-2 cursor-pointer border-blue checked:bg-yellow'
                                onChange={() =>
                                  handleCheckboxChange(foodItem.id)
                                }
                              />
                            </div>
                          )}
                          <div
                            onInput={(e) =>
                              handleChangeFoodInfo(e, foodItem.id, 'name')
                            }
                            className='border-b-2 border-white focus:border-blue focus:border-b-2 focus:outline-none px-2 flex-1'
                            contentEditable='true'
                            suppressContentEditableWarning={true}
                          >
                            {foodItem.name}
                          </div>
                          <div
                            onInput={(e) =>
                              handleChangeFoodInfo(e, foodItem.id, 'price')
                            }
                            className='border-b-2 border-white focus:border-blue focus:border-b-2 focus:outline-none px-2'
                            contentEditable='true'
                            suppressContentEditableWarning={true}
                          >
                            {foodItem.price}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className='modify_food_container flex flex-col items-center justify-between w-fit'>
                      <div className='add relative flex items-center justify-center'>
                        <button
                          className='border-2 bg-blue hover:bg-blue text-white hover:bg-blue/[0.9] focus:outline-none shadow-md font-bold py-2 px-2 mx-3 rounded text-center text-base flex justify-center items-center'
                          onClick={handleShowAddFood}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ color: '#ffffff' }}
                          />
                        </button>
                        {addFood && (
                          <div className='more_food_container flex rounded ml-2 px-2 py-2 absolute w-max left-full border-2'>
                            <div className='food flex flex-row w-1/2 mr-2 relative'>
                              {showNumTip && (
                                <span className='absolute top-full w-max bg-red text-white px-2 py-1.5 mt-4 -left-2.5 shadow-md rounded text-xs font-medium duration-100'>
                                  Please Check Food is not empty & <br /> Price
                                  is number!
                                </span>
                              )}
                              <input
                                type='text'
                                value={newFood}
                                placeholder='food'
                                onChange={(e) => {
                                  setShowNumTip(false);
                                  setNewFood(e.target.value);
                                }}
                                className={`border-b-2 text-sm text-gray-700 font-medium px-1 focus:outline-none w-24 mx-1 ${
                                  showNumTip
                                    ? 'border-red focus:border-red'
                                    : 'border-blue focus:border-yellow'
                                }`}
                              />
                            </div>
                            <div className='price flex flex-row relative'>
                              <div className='text-blue font-medium'>$ </div>
                              <input
                                type='num'
                                value={newPrice}
                                placeholder='num'
                                onChange={(e) => {
                                  setShowNumTip(false);
                                  setNewPrice(e.target.value);
                                }}
                                className={`border-b-2 text-sm text-gray-700 font-medium px-1  focus:outline-none w-12 mx-1 ${
                                  showNumTip
                                    ? 'border-red focus:border-red'
                                    : 'border-blue focus:border-yellow'
                                }`}
                              />
                            </div>
                            <div className='mx-1'>
                              <button
                                className='bg-yellow hover:bg-blue text-white font-bold rounded text-center px-2 text-sm py-1'
                                onClick={handleAddFood}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='delete relative flex items-center justify-center'>
                        <button
                          className='border-2 bg-blue hover:bg-blue text-white hover:bg-blue/[0.9] focus:outline-none shadow-md font-bold py-2 px-2 mx-3 rounded text-center text-base relative flex justify-center items-center'
                          onClick={handleShowDeleteFood}
                        >
                          <FontAwesomeIcon
                            icon={faMinus}
                            style={{ color: '#ffffff' }}
                          />
                        </button>
                        {deleteFood && (
                          <div className='flex rounded ml-2 py-2 absolute w-max left-full '>
                            <button
                              className='bg-yellow hover:bg-blue text-white font-bold rounded text-center px-2 text-sm py-2'
                              onClick={handleDeleteFood}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className=''>
                  <td className={`${styles.form_name}`}>
                    <div className='flex items-center'>
                      Menu
                      <button
                        className='border-2 bg-blue hover:bg-blue text-white focus:outline-none shadow-md font-bold py-2 px-2 mx-3 rounded text-center text-base relative flex justify-center items-center'
                        onClick={() => handleMenuUpload()}
                        type='submit'
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        {showTooltip && (
                          <span className='absolute top-full w-max bg-blue hover:bg-blue/[0.9] text-white px-2 py-1.5 mt-1.5 shadow-md rounded text-xs font-normal duration-100'>
                            Upload Menu
                          </span>
                        )}
                        <FontAwesomeIcon
                          icon={faUpload}
                          style={{ color: '#fff' }}
                        />
                      </button>
                      <input
                        type='file'
                        id='fileInput'
                        name='fileInput'
                        onChange={handleMenuChange}
                        className='hidden'
                        ref={fileInputRef}
                        accept='image/*'
                      />
                    </div>
                  </td>
                  <td className=''>
                    <ImageDisplay menuURLs={menuURLs} menus={menus} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='text-center my-6'>
            <button
              className='bg-yellow hover:bg-blue text-white font-bold py-2 px-6 rounded text-center'
              onClick={() => handleSave()}
            >
              Save
            </button>
            <Link to='/allRestaurant'>
              <button className='bg-blue hover:bg-brown text-white font-bold py-2 px-6 ml-6 rounded text-center'>
                Back
              </button>
            </Link>
            <button
              className='bg-red hover:bg-yellow text-white font-bold py-2 px-6 ml-6 rounded text-center'
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDetail;
