import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);

  const toggleDropdown = (item) => {
    if (item === 'About') {
      setIsAboutMeOpen(!isAboutMeOpen);
    } else if (item === 'Order') {
      setIsOrderOpen(!isOrderOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAboutMeOpen(false);
        setIsOrderOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='bg-blue w-full'>
      <div className='flex items-center justify-between mx-4 p-2'>
        <div className='flex w-2/3 items-center ' id='navbar-left'>
          <Link to='/'>
            <FontAwesomeIcon
              icon={faHouse}
              style={{ color: '#ffffff' }}
              size='xl'
              className='cursor-pointer'
            />
          </Link>
          <div className='flex relative' id='navbar-dropdown' ref={dropdownRef}>
            <ul className='flex font-medium mx-6 rtl:space-x-reverse'>
              <li>
                <button
                  id='dropdownNavbarLink'
                  onClick={() => toggleDropdown('About')}
                  className={`${styles.dropdown}`}
                >
                  About Me <FontAwesomeIcon icon={faChevronDown} size='sm' />
                </button>
                <div
                  id='dropdownNavbar'
                  className={`z-10 ${
                    isAboutMeOpen ? 'block' : 'hidden'
                  } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow`}
                >
                  <ul className='pt-2 text-base text-white bg-blue absolute'>
                    <li>
                      <Link to='/allRestaurant'>
                        <div className={`${styles.dropdown_item}`}>
                          My Restaurant
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to='/friendAndGroup'>
                        <div className={`${styles.dropdown_item}`}>
                          My Friend & Group
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className='ml-10'>
                <button
                  id='dropdownNavbarLink'
                  onClick={() => toggleDropdown('Order')}
                  className={`${styles.dropdown} `}
                >
                  Order <FontAwesomeIcon icon={faChevronDown} size='sm' />
                </button>
                <div
                  id='dropdownNavbar'
                  className={`z-10 ${
                    isOrderOpen ? 'block' : 'hidden'
                  } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow`}
                >
                  <ul className='pt-2 text-base text-white bg-blue absolute z-50'>
                    <li>
                      <Link to='/createOrder'>
                        <div className={`${styles.dropdown_item}`}>
                          Create Order
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to='/history'>
                        <div className={`${styles.dropdown_item}`}>
                          Order History
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to='/allOrder'>
                        <div className={`${styles.dropdown_item}`}>
                          View Order
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to='/report'>
                        <div className={`${styles.dropdown_item}`}>
                          Order Report
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='' id='navbar-login'>
          {isLoggedIn ? (
            <div
              onClick={() => logoutUser}
              className='flex flex-row-reverse w-full py-2 px-3 text-lg font-medium text-white hover:text-gray-700 cursor-pointer rounded z'
            >
              Log out
            </div>
          ) : (
            <Link to='/login'>
              <div className='flex flex-row-reverse w-full py-2 px-3 text-lg font-medium text-white hover:text-gray-700 cursor-pointer rounded z'>
                Log in
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
