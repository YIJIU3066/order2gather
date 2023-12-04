import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import styles_img from '../styles/addRestaurant.module.css';
import Swal from 'sweetalert2';

const ImageDisplay = ({ menuURLs, menus, setMenus, setMenuURLs }) => {
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);

  //設定哪張圖片是全螢幕
  const handleFullScreen = (index) => {
    setFullscreenImageIndex(index);
  };

  //關閉全螢幕
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

        // const remainMenus = restaurantInfo.menu.filter(
        //   (_, index) => index !== indexToDelete
        // );

        // setRestaurantInfo((prevRestaurantInfo) => ({
        //   ...prevRestaurantInfo,
        //   menu: remainMenus,
        // }));

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

  return (
    <>
      <div className='flex items-center justify-center my-2'>
        <div className='menu_container overflow-x-auto w-80 flex items-center justify-start h-[130px]'>
          {menus &&
            menuURLs.map((menuSrc, index) => (
              <div
                className='relative mr-2 w-[150px] h-[100px] min-w-[150px] min-h-[100px] bg-black flex justify-center items-center'
                key={index}
              >
                <div className='relative w-full h-full'>
                  {/* <button
                    className='cursor-pointer bg-transport bg-blue/[0.8] hover:bg-yellow/[0.8] w-4 h-4 hover:w-5 hover:h-5 hover:-top-2.5 hover:-right-2.5 shadow-md rounded-full absolute -top-2 -right-2 flex justify-center items-center'
                    onClick={() => handleDeleteMenu(index)}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      size='2xs'
                      style={{ color: '#ffffff' }}
                    />
                  </button> */}
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
                    <button
                      className='cursor-pointer bg-transports hover:bg-grey/[0.8] w-10 h-10 rounded-full absolute top-4 right-4'
                      onClick={(e) => handleCloseFullScreen()}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        size='lg'
                        style={{ color: '#fff' }}
                        className='faXmark_full'
                      />
                    </button>
                    {/* 前一張 */}
                    <button
                      style={{
                        visibility: index !== 0 ? 'visible' : 'hidden',
                      }}
                      className='text-white z-50 hover:bg-gray-600/[0.7] w-10 h-10 mr-3 rounded-full shadow-md flex justify-center items-center'
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} size='lg' />
                    </button>
                    <div className='relative flex justify-center w-[85%]'>
                      {/* 圖片 */}

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
                          index !== menuURLs.length - 1 ? 'visible' : 'hidden',
                      }}
                      className='text-white z-50 hover:bg-gray-600 bg-gray-700/[0.6] w-10 h-10 ml-3 rounded-full shadow-md flex justify-center items-center'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                    >
                      <FontAwesomeIcon icon={faAngleRight} size='lg' />
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ImageDisplay;
