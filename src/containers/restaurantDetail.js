import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import styles from '../styles/form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const RestaurantDetail = () => {
  const location = useLocation();
  const { restaurant } = location.state || {};
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [opentime, setOpentime] = useState('');
  const [menu, setMenu] = useState('');

  if (!restaurant) {
    return <div>No restaurant data found</div>;
  }

  const handleChangeName = () => {
    console.log('handleChangeName');
  };

  const handleDelete = () => {
    console.log('handleDelete');
  };

  return (
    <>
      <NavBar />

      <div className='restaurant_detail_container flex flex-col justify-center'>
        <div className='flex justify-center text-3xl font-semibold text-blue my-6'>
          {restaurant.name}
        </div>

        <div className='input_container text-lg mt-6 mx-14 flex flex-col items-center'>
          <table className='table-auto'>
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
                    onInput={handleChangeName}
                    contentEditable='true'
                    suppressContentEditableWarning={true}
                    className='ml-2 text-blue font-semibold border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-blue'
                  >
                    {restaurant.address}
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
                    onInput={handleChangeName}
                    contentEditable='true'
                    suppressContentEditableWarning={true}
                    className='ml-2 text-blue font-semibold border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-blue'
                  >
                    {restaurant.telephone}
                  </div>
                </td>
              </tr>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Open Time</td>
                <td className={`${styles.form_content}`}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: '#7A989A' }}
                    size='sm'
                  />
                  <div
                    onInput={handleChangeName}
                    contentEditable='true'
                    suppressContentEditableWarning={true}
                    className='ml-2 text-blue font-semibold border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-blue'
                  >
                    {}
                  </div>
                </td>
              </tr>
              <tr className='border-b'>
                <td className={`${styles.form_name}`}>Menu</td>
                <td className={`${styles.form_content}`}>
                  <button
                    className='bg-green hover:bg-yellow text-white font-bold py-2 px-3 rounded text-center text-base'
                    // onClick={() => handleMenuUpload()}
                  >
                    <FontAwesomeIcon icon={faUpload} className='pr-3' />
                    Upload
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='text-center mt-8'>
          <Link to='/allRestaurant'>
            <button className='bg-yellow hover:bg-brown text-white font-bold py-2 px-6 rounded text-center'>
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
    </>
  );
};

export default RestaurantDetail;
