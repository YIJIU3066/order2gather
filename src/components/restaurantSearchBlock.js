import React, { useState, useEffect, useContext } from 'react';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';

const RestaurantSearchBlock = ({ searchText, handleChoose }) => {
  // const [restaurantList, setRestaurantList] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurantList, setRestaurantList] = useState([
    {
      id: 1,
      name: '八方雲集',
      address: '地址地址地址',
      telephone: '02-12345678',
    },
    {
      id: 2,
      name: '邱奶奶早餐店',
      address: '這裡是地址!',
      telephone: '02-23456789',
    },
  ]);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getAllRestaurant = async () => {
      try {
        const response = await axiosInstance.get('/restaurant/display');
        // console.log(response);
        setRestaurantList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.response);
      }
    };

    getAllRestaurant();
  }, []);

  //搜尋
  useEffect(() => {
    if (searchText === '') {
      setFilteredRestaurants(restaurantList); // 如果搜索字串為空，顯示所有餐廳
    } else {
      const filtered = restaurantList.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchText, restaurantList]);

  const chooseRestaurant = (selected) => {
    console.log(selected);
    handleChoose(selected);
  };
  // useEffect(()=>{
  //   console.log(filteredRestaurants)
  // },[filteredRestaurants])
  // const handleSearch = (event) => {
  //   setSearchQuery(event.target.value);
  // };
  return (
    <div
      className='absolute left-full w-max mx-2 shadow-md bg-slate-50 rounded'
      onClick={(e) => e.stopPropagation}
    >
      <div className=''>
        {filteredRestaurants &&
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => chooseRestaurant(restaurant.name)}
              className='px-4 py-2 text-base font-semibold my-2 cursor-pointer flex items-center text-center text-gray-700 hover:bg-blue hover:text-white'
            >
              {restaurant.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantSearchBlock;
