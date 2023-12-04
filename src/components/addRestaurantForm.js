import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from '../styles/form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import ImageDisplay from './imageDisplay';
import ModifyFood from './modifyFood';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';

const AddRestaurantForm = ({ onSave, onClose }) => {
  // const user = 1;
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurant: [{ address: '', name: '', openHour: '', phone: '' }],
    food: [],
    menu: [],
  });
  const [menus, setMenus] = useState([]);
  const [menuURLs, setMenuURLs] = useState([]);
  const fileInputRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  //圖片
  useEffect(() => {
    if (menus.length < 1) return;

    // Create new image URLs from the menus

    const newImageUrls = menus.map((menu) => URL.createObjectURL(menu));
    setMenuURLs((prevMenuURLs) => {
      // Clean up previous image URLs before adding new ones
      prevMenuURLs.forEach((url) => URL.revokeObjectURL(url));
      return [...newImageUrls];
    });
    // Clean up previous image URLs when menus change
    return () => {
      menus.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [menus]);

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
            // menu: [...prevRestaurantInfo.menu, base64ImageData],
            menu: [...prevRestaurantInfo.menu, file],
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

  //儲存圖片
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
      formData.append('image', uploadImg); // Add the image file directly to FormData
      formData.append('food', foodString);

      // const response = await axiosInstance.post('/restaurant/save', formData);

      // Swal.fire({
      //   title: 'Success!',
      //   text: 'Edit Restaurant Success!',
      //   icon: 'success',
      //   iconColor: '#CF9546',
      //   confirmButtonColor: '#7A989A',
      // });
    } catch (error) {
      console.log(`Update Restaurant Data Error, ${error}`);
    }
  };

  const handleInputRestantantInfo = (e, type) => {
    const updatedValue = e.target.value;
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

  const handleDeleteFoodSave = async (selectedItems) => {
    for (const deleteFood of selectedItems) {
      try {
        const response = await axiosInstance.delete('/restaurant/deleteFood', {
          params: { rid: restaurantInfo.restaurant[0].id, fid: deleteFood },
        });
        console.log('Food Deleted:', response);
      } catch (error) {
        console.log('Failed to Delete Food', error);
      }
    }
  };

  // 儲存餐廳資料
  const handleSave = () => {
    // 檢查表單是否有效
    onSave(restaurantInfo);
  };

  // 關閉新增餐廳視窗
  const handleClose = () => {
    onClose();
  };

  return (
    <div className='restaurant_form_container w-full h-full flex justify-center items-center'>
      <div className='h-[95%] w-10/12 border-8 px-20 border-blue p-4 rounded shadow flex flex-col items-center bg-slate-50 relative overflow-auto'>
        <div
          className='cursor-pointer absolute top-0 right-0 px-6 py-4'
          onClick={() => handleClose()}
        >
          <FontAwesomeIcon
            icon={faXmark}
            size='2xl'
            style={{ color: '#7A989A' }}
          />
        </div>
        <div className='flex justify-center text-3xl font-semibold text-blue my-4'>
          Add Restaurant
        </div>

        <div className='input_container text-lg mt-4 flex w-full flex-col items-center overflow-auto '>
          <table className=''>
            <tbody>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Restaurant Name*</td>
                <td className=''>
                  <input
                    className={`${styles.form_input}`}
                    placeholder='(Required) Restaurant Name'
                    type='text'
                    value={restaurantInfo.restaurant.name}
                    onChange={(e) => handleInputRestantantInfo(e, 'name')}
                  />
                </td>
              </tr>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Address</td>
                <td className=''>
                  <input
                    className={`${styles.form_input}`}
                    placeholder='Address'
                    type='text'
                    value={restaurantInfo.restaurant.address}
                    onChange={(e) => handleInputRestantantInfo(e, 'address')}
                  />
                </td>
              </tr>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Telephone*</td>
                <td className=''>
                  <input
                    className={`${styles.form_input}`}
                    placeholder='(Required) Phone Number'
                    type='text'
                    value={restaurantInfo.restaurant.phone}
                    onChange={(e) => handleInputRestantantInfo(e, 'phone')}
                  />
                </td>
              </tr>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Food</td>
                <td className=''>
                  <ModifyFood
                    restaurantInfo={restaurantInfo}
                    setRestaurantInfo={setRestaurantInfo}
                    handleDeleteFoodSave={handleDeleteFoodSave}
                    isNew={true}
                  />
                </td>
              </tr>
              <tr className=''>
                <td className={`${styles.form_name}`}>
                  <div className='flex items-center'>
                    Menu
                    <button
                      className='border-2 bg-blue hover:bg-blue text-white focus:outline-none shadow-md font-bold py-3 px-3 mx-3 rounded text-center text-base relative flex justify-center items-center'
                      onClick={() => handleMenuUpload()}
                      type='submit'
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      {showTooltip && (
                        <span className='absolute left-full w-max bg-blue text-white px-2 py-1.5 ml-1.5 shadow-md rounded text-xs font-normal duration-100'>
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
                  <ImageDisplay
                    menuURLs={menuURLs}
                    menus={menus}
                    setMenus={setMenus}
                    setMenuURLs={setMenuURLs}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className='bg-yellow hover:bg-green text-white font-bold py-2 px-6 my-6 rounded text-center'
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default AddRestaurantForm;
