import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const toggleDropdown = (item) => {
    if (item === "About") {
      setIsAboutMeOpen(!isAboutMeOpen);
    } else if (item === "Order") {
      setIsOrderOpen(!isOrderOpen);
    }
  };

  return (
    <nav className="bg-blue w-full">
      <div className="flex items-center justify-between mx-4 p-2">
        <div className="flex w-2/3 items-center " id="navbar-left">
          <FontAwesomeIcon icon={faHouse} style={{color:"#ffffff"}} size="xl"/>
          {/* <img src="/images/house.png" className="h-6" alt="House" /> */}
          <div className="flex relative" id="navbar-dropdown">
            <ul className="flex font-medium mx-6 rtl:space-x-reverse">
              <li>
                <button
                  id="dropdownNavbarLink"
                  onClick={() => toggleDropdown("About")}
                  className={`${styles.dropdown}`}
                >
                  About Me{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`z-10 ${
                    isAboutMeOpen ? "block" : "hidden"
                  } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow`}
                >
                  <ul className="pt-2 text-base text-white bg-blue absolute">
                    <li>
                      <div className={`${styles.dropdown_item}`}>
                        My Restaurant
                      </div>
                    </li>
                    <li>
                      <div className={`${styles.dropdown_item}`}>
                        My Friend & Group
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="ml-10">
                <button
                  id="dropdownNavbarLink"
                  onClick={() => toggleDropdown("Order")}
                  className={`${styles.dropdown} `}
                >
                  Order{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`z-10 ${
                    isOrderOpen ? "block" : "hidden"
                  } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow`}
                >
                  <ul className="pt-2 text-base text-white bg-blue absolute">
                    <li>
                      <div className={`${styles.dropdown_item}`}>
                        Create Order
                      </div>
                    </li>
                    <li>
                      <div className={`${styles.dropdown_item}`}>
                        Order History
                      </div>
                    </li>
                    <li>
                      <div className={`${styles.dropdown_item}`}>
                        View Order
                      </div>
                    </li>
                    <li>
                      <div className={`${styles.dropdown_item}`}>
                        Order Report
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="" id="navbar-login">
          <div className="flex flex-row-reverse w-full py-2 px-3 text-lg font-medium text-white hover:text-gray-700 cursor-pointer rounded z">
            Log in
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
