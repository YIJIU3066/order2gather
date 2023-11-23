import { useState } from "react";
import NavBar from "../components/navbar";
import RestaurantCard from "../components/restaurantCard";
import SearchBar from "../components/searchBar";
import AddItem from "../components/addItem";
import AddRestaurantForm from "../components/addRestaurantForm"

const AllRestaurant = () => {
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [restaurantList, setRestaurantList] = useState([
    { id: 1, name: "八方雲集", address: "地址地址地址", telephone: "02-12345678" },
    { id: 2, name: "邱奶奶早餐店", address: "這裡是地址!", telephone: "02-23456789" },
  ]);

  const handleAddRestaurant = () => {
    setShowRestaurantForm(true);
  };

  const handleCloseRestaurantForm = () => {
    setShowRestaurantForm(false);
  };

  const handleSaveRestaurant = (newRestaurantData) => {
    setRestaurantList([...restaurantList, newRestaurantData]);
    setShowRestaurantForm(false);
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-3xl font-semibold text-blue my-6">
        Restaurants
      </div>
      <div className="mx-20 flex flex-col">
        <div className="flex flex-row items-center">
          <SearchBar />
          <AddItem onClick={handleAddRestaurant} hintText="Click to Add a New Restaurant!"/>
        </div>
        <div className="restaurant_list_container mt-10 flex flex-row">
          {restaurantList.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} index={index} />
          ))}
        </div>
      </div>
      {showRestaurantForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100">
          <AddRestaurantForm
            onClose={handleCloseRestaurantForm}
            onSave={handleSaveRestaurant}
          />
        </div>
      )}
    </>
  );
};
export default AllRestaurant;
