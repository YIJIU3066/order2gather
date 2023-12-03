import React, { useEffect, useState, useRef } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';

const RestaurantDetail = () => {
  const location = useLocation();
  const axiosInstance = useAxios();

  const { restaurant } = location.state || {};
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [menus, setMenus] = useState([]);
  const [menuURLs, setMenuURLs] = useState([]);
  const fileInputRef = useRef(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  //從後端拿餐廳資料
  useEffect(() => {
    const getRestaurantInfo = async () => {
      try {
        const response = await axiosInstance.get('/restaurant/display', {
          params: { rid: restaurant.id },
        });

        setRestaurantInfo({
          // food: response.data.food,
          menu: response.data.menu,
          restaurant: response.data.restaurant,
        });

        const newImageUrls = response.data.menu.map((menuString) =>
          convertStringToImage(menuString)
        );
        setMenuURLs(newImageUrls);
      } catch (error) {
        console.log('error', error);
      }
    };
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

  // useEffect(() => {
  //   console.log('menuURLs', menuURLs);
  //   console.log('menus', menus);
  // }, [menus, menuURLs]);

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
        setRestaurantInfo((prevRestaurantInfo) => {
          return {
            ...prevRestaurantInfo,
            menu: [...prevRestaurantInfo.menu, imageDataString],
          };
        });
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

  // 點擊圖片全螢幕
  const handleFullScreen = (index) => {
    setFullscreenImageIndex(index);
  };

  // 點擊關閉全螢幕
  const handleCloseFullScreen = () => {
    setFullscreenImageIndex(null);
  };

  // 前一張全螢幕
  const handlePrevImage = () => {
    if (fullscreenImageIndex !== null && fullscreenImageIndex > 0) {
      setFullscreenImageIndex(fullscreenImageIndex - 1);
    }
  };

  // 下一張全螢幕
  const handleNextImage = () => {
    if (
      fullscreenImageIndex !== null &&
      fullscreenImageIndex < menuURLs.length - 1
    ) {
      setFullscreenImageIndex(fullscreenImageIndex + 1);
    }
  };

  //轉換資料格式
  // const restructureData = (restaurantInfo) => {
  //   console.log(restaurantInfo)
  //   let formData = new FormData();
  //   // Loop through the object
  //   for (let [key, val] of Object.entries(restaurantInfo)) {
  //     // append each item to the formData (converted to JSON strings)
  //     formData.append(key, JSON.stringify(val));
  //   }
  //   console.log(formData);
  //   return formData;

  // const { name, openHour, phone } = restaurantInfo.restaurant[0];
  // console.log(name, openHour, phone)

  // formData.append('restaurant', JSON.stringify({ name, openHour, phone }));
  // console.log(formData)
  // restaurantInfo.menu.forEach((image, index) => {
  //   formData.append(`image${index}`, image);
  // });

  // return formData;
  // };

  const convertToFormData = (restaurantInfo) => {
    const formData = new FormData();
    const restaurantData = restaurantInfo.restaurant[0];
    for (const key in restaurantData) {
      formData.append(`${key}`, restaurantData[key]);
    }

    // restaurantInfo.menu.forEach((imageData, index) => {
    //   formData.append(`menu[${index}]`, imageData);
    // });
    console.log(formData);

    for (const entry of formData.entries()) {
      console.log(entry);
    }
    return formData;
  };

  // 儲存資料
  const handleSave = async () => {
    try {
      const restaurantInfoFormData = convertToFormData(restaurantInfo);
      await axiosInstance.put('/restaurant/update', restaurantInfoFormData);
    } catch (error) {
      console.log(`Update Restaurant Data Error, ${error}`);
    }
  };

  if (!restaurant) {
    return <div>No restaurant data found</div>;
  }

  const handleDelete = () => {
    console.log('handleDelete');
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

  useEffect(() => {
    console.log(restaurantInfo);
  }, [restaurantInfo]);

  return (
    <>
      <NavBar />
      {restaurantInfo && (
        <div className='restaurant_detail_container flex flex-col justify-center'>
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
          <div className='input_container text-lg mt-4 mx-14 flex flex-col items-center overflow-x-auto overflow-y-auto h-1/2 w-[95%]'>
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
                {/* <tr className='border-b'>
                <td className={`${styles.form_name}`}>Open Time</td>
                <td className=''>
                  <input
                    className={`${styles.form_input}`}
                    placeholder='Open Time'
                    value={opentime}
                    onChange={(e) => setOpentime(e.target.value)}
                  />
                </td>
              </tr> */}
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
                          <span className='absolute top-full w-max bg-blue text-white px-2 py-1.5 mt-1.5 shadow-md rounded text-xs font-normal duration-100'>
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
                    <div className='flex items-center justify-center my-2'>
                      <div className='menu_container overflow-x-auto w-80 flex items-center justify-start h-[130px]'>
                        {menus &&
                          menuURLs.map((menuSrc, index) => (
                            <div
                              className='relative mr-2 w-[150px] h-[100px] min-w-[150px] min-h-[100px] bg-black flex justify-center items-center'
                              key={index}
                            >
                              <div className='relative w-full h-full'>
                                <button
                                  className='cursor-pointer bg-transport bg-blue/[0.8] hover:bg-yellow/[0.8] w-4 h-4 hover:w-5 hover:h-5 hover:-top-2.5 hover:-right-2.5 shadow-md rounded-full absolute -top-2 -right-2 flex justify-center items-center'
                                  onClick={() => handleDeleteMenu(index)}
                                >
                                  <FontAwesomeIcon
                                    icon={faXmark}
                                    size='2xs'
                                    style={{ color: '#ffffff' }}
                                  />
                                </button>
                                <img
                                  src={menuSrc}
                                  alt='Selected'
                                  className='w-full h-full object-cover menu_img cursor-pointer'
                                  onClick={() => handleFullScreen(index)}
                                />
                              </div>

                              {/* 全螢幕圖片 */}
                              {fullscreenImageIndex === index && (
                                <div
                                  className={`${styles_img.zoom_img_container}`}
                                  onClick={(e) => {
                                    handleCloseFullScreen(); // 關閉全螢幕
                                  }}
                                >
                                  {/* 前一張 */}
                                  <button
                                    style={{
                                      visibility:
                                        index !== 0 ? 'visible' : 'hidden',
                                    }}
                                    className='text-white z-50 hover:bg-gray-600/[0.7] w-10 h-10 mr-3 rounded-full shadow-md flex justify-center items-center'
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePrevImage();
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faAngleLeft}
                                      size='lg'
                                    />
                                  </button>
                                  <div className='relative flex justify-center w-10/12'>
                                    {/* 圖片 */}
                                    <button
                                      className='cursor-pointer bg-transport  hover:bg-grey/[0.8] w-10 h-10 rounded-full absolute top-2 right-2 flex justify-center items-center'
                                      onClick={(e) => handleCloseFullScreen()}
                                    >
                                      <FontAwesomeIcon
                                        icon={faXmark}
                                        size='lg'
                                        style={{ color: '#fff' }}
                                        className='faXmark_full'
                                      />
                                    </button>
                                    <img
                                      src={menuSrc}
                                      alt='Fullscreen'
                                      className={`${styles_img.zoom_img}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    />
                                  </div>

                                  {/* 下一張 */}
                                  <button
                                    style={{
                                      visibility:
                                        index !== menuURLs.length - 1
                                          ? 'visible'
                                          : 'hidden',
                                    }}
                                    className='text-white z-50 hover:bg-gray-600 bg-gray-700/[0.6] w-10 h-10 ml-3 rounded-full shadow-md flex justify-center items-center'
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNextImage();
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faAngleRight}
                                      size='lg'
                                    />
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='text-center mt-8'>
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
