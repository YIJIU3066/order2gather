import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/form.module.css';
import styles_img from '../styles/addRestaurant.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faXmark,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import ImageDisplay from './imageDisplay';

const AddRestaurantForm = ({ onSave, onClose }) => {
  const user = 1;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [opentime, setOpentime] = useState('');
  const [menus, setMenus] = useState([]);
  const [menuURLs, setMenuURLs] = useState([]);
  const fileInputRef = useRef(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (menus.length < 1) return;

    // Create new image URLs from the menus
    const newImageUrls = menus.map((menu) => URL.createObjectURL(menu));
    setMenuURLs(newImageUrls);

    // Clean up previous image URLs when menus change
    return () => {
      menus.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [menus]);

  // 選擇圖片
  const handleMenuChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setMenus([...menus, file]);
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

  // 儲存餐廳資料
  const handleSave = () => {
    // 檢查表單是否有效
    if (name && telephone) {
      onSave({ name, address, telephone });
      setName('');
      setAddress('');
      setTelephone('');
      setOpentime('');
      // setMenu("");
      setMenus([]);

      const restaurant = {
        uid: user,
        name: name,
        address: address,
        phone: telephone,
        openHour: opentime,
        menu: menus,
      };
      // 資料存到後端

      Swal.fire({
        title: 'Success!',
        text: 'Add Restaurant Succussful!',
        icon: 'success',
        iconColor: '#CF9546',
        confirmButtonColor: '#7A989A',
        confirmButtonText: 'OK!',
      });
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
        if (result.isConfirmed) {
          console.log('Confirmed!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log('Cancelled!');
          handleClose();
        }
      });
    }
  };

  // 關閉新增餐廳視窗
  const handleClose = () => {
    onClose();
  };

  return (
    <div className='restaurant_form_container w-full h-full flex justify-center items-center overflow-auto '>
      <div className='w-fit border-8 px-20 border-blue p-4 rounded shadow flex flex-col items-center bg-slate-50 relative'>
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

        <div className='input_container text-lg mt-4 mx-14 flex flex-col items-center overflow-x-auto overflow-y-auto h-1/2 w-[95%]'>
          <table className=''>
            <tbody>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Restaurant Name*</td>
                <td className=''>
                  <input
                    className={`${styles.form_input}`}
                    placeholder='Restaurant Name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Address</td>
                <td className=''>
                  <input
                    className={`${styles.form_input}`}
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </td>
              </tr>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Telephone*</td>
                <td className=''>
                  <input
                    className={`${styles.form_input}`}
                    placeholder='Phone Number'
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
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
                  <ImageDisplay menuURLs={menuURLs} menus={menus} />
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
