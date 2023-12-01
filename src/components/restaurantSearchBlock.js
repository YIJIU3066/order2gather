import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';

const RestaurantSearchBlock = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const axiosInstance = useAxios();

  useEffect(() => {
    const getAllRestaurant = async () => {
      try {
        const response = await axiosInstance.get('/restaurant/display');
        console.log(response);
        // const data = JSON.parse(response.data);
        console.log(Object.keys(response));
        console.log(data);

        // const restaurants = data.restaurants;
        // console.log(data.restaurants);

        // Now 'restaurants' should contain the array of restaurant objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllRestaurant();
  }, []);

  useEffect(() => {
    console.log(restaurantList);
    // const filtered = restaurantList.filter((restaurant) =>
    //   restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setFilteredRestaurants(filtered);
  }, [restaurantList]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div>
      {/* <input
        type='text'
        placeholder='Search restaurants...'
        value={searchQuery}
        onChange={handleSearch}
      /> */}
      <ul>
        {filteredRestaurants.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantSearchBlock;
