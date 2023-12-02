import React, { useState, useEffect } from 'react';

const RestaurantSearchBlock = ({
  searchText,
  restaurantList,
  handleChoose,
  handleAddRestaurant,
}) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

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
    handleChoose({ id: selected.id, name: selected.name });
  };

  const addRestaurant = () => {
    handleAddRestaurant();
  };

  return (
    <>
      <div
        className='absolute left-full w-max mx-2 shadow-md bg-slate-50 rounded'
        onClick={(e) => e.stopPropagation}
      >
        <ul className='flex flex-col justify-center items-center'>
          {filteredRestaurants.length != 0 &&
            filteredRestaurants.map((restaurant) => (
              <li
                key={restaurant.id}
                onClick={() => chooseRestaurant(restaurant)}
                className='text-base w-full font-semibold py-2 px-2 cursor-pointer flex items-center justify-center text-center text-gray-700 hover:bg-blue hover:text-white'
              >
                {restaurant.name}
              </li>
            ))}
          <div
            className='text-base w-full font-semibold py-2 px-2 cursor-pointer flex items-center justify-center text-center text-gray-700 hover:bg-blue hover:text-white'
            onClick={addRestaurant}
          >
            + Add Restanuant
          </div>
        </ul>
      </div>
    </>
  );
};

export default RestaurantSearchBlock;
