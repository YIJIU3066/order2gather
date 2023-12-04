import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/navbar';
import RestaurantCard from '../components/restaurantCard';
import SearchBar from '../components/searchBar';
import AddItem from '../components/addItem';
import AddRestaurantForm from '../components/addRestaurantForm';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

const AllRestaurant = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');

  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const getAllRestaurant = async () => {
    try {
      const response = await axiosInstance.get('/restaurant/display');
      setRestaurantList(response.data.restaurant);
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }
  };
  useEffect(() => {
    getAllRestaurant();
  }, []);

  // 搜尋
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchText === '') {
      // 如果搜索字串為空，顯示所有餐廳
      setFilteredRestaurants(restaurantList);
    } else {
      const filtered = restaurantList.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchText, restaurantList]);

  const handleAddRestaurant = () => {
    setShowRestaurantForm(true);
  };

  const handleCloseRestaurantForm = () => {
    setShowRestaurantForm(false);
  };

  const convertToFormData = (restaurantString, restaurantInfo, foodString) => {
    const formData = new FormData();
    formData.append('restaurant', restaurantString);
    restaurantInfo.menu.forEach((file, index) => {
      formData.append('menu', file);
    });
    formData.append('food', foodString);
    return formData;
  };

  //儲存
  const handleInputRestantantInfo = async (restaurantInfo) => {
    // 檢查
    const requiredFields = [
      restaurantInfo.restaurant[0]?.name,
      restaurantInfo.restaurant[0]?.phone,
    ];
    const isAllFilled = requiredFields.every(
      (field) => field !== undefined && field.trim() !== ''
    );

    if (isAllFilled) {
      try {
        const restaurantString = JSON.stringify(restaurantInfo.restaurant[0]);
        const foodData = restaurantInfo.food.map(({ name, price }) => ({
          name,
          price,
        }));
        const foodString = JSON.stringify(foodData);
        const restaurantInfoFormData = convertToFormData(
          restaurantString,
          restaurantInfo,
          foodString
        );
        const response = await axiosInstance.post(
          '/restaurant/save',
          restaurantInfoFormData
        );
        getAllRestaurant();
        // setRestaurantList((prevList) => [...prevList, restaurantInfo.restaurant[0]]);
        // setFilteredRestaurants((prevList) => [...prevList, restaurantInfo.restaurant[0]]);
        Swal.fire({
          title: 'Success!',
          text: 'Add Restaurant Succussful!',
          icon: 'success',
          iconColor: '#CF9546',
          confirmButtonColor: '#7A989A',
          confirmButtonText: 'OK!',
        });
        handleCloseRestaurantForm();
      } catch (error) {
        console.error('Error adding restaurant:', error);
      }
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
        if (result.dismiss === Swal.DismissReason.cancel) {
          console.log('Cancelled!');
          handleCloseRestaurantForm();
        }
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex justify-center text-3xl font-semibold text-blue my-6'>
        Restaurants
      </div>
      <div className='mx-20 flex flex-col'>
        <div className='flex flex-row items-center'>
          <SearchBar
            searchtext={searchText}
            handleInputChange={handleInputChange}
          />
          <AddItem
            onClick={handleAddRestaurant}
            hintText='Click to Add a New Restaurant!'
          />
        </div>
        <div className='restaurant_list_container mt-10 grid grid-cols-5 gap-3'>
          {filteredRestaurants.length != 0 &&
            filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={index}
                restaurant={restaurant}
                index={index}
              />
            ))}
        </div>
      </div>
      {showRestaurantForm && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <AddRestaurantForm
            onClose={handleCloseRestaurantForm}
            onSave={handleInputRestantantInfo}
          />
        </div>
      )}
    </>
  );
};
export default AllRestaurant;
