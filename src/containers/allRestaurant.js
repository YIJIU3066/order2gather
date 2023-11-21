import NavBar from "../components/navbar";
import RestaurantCard from "../components/restaurantCard";
import SearchBar from "../components/searchBar";
import AddItem from "../components/addItem";

const AllRestaurant = () => {
  const restaurant_list = [
    { name: "八方雲集", address: "地址地址地址", telephone: "02-12345678" },
    { name: "邱奶奶早餐店", address: "這裡是地址!", telephone: "02-23456789" },
  ];
  return (
    <>
      <NavBar />
      <div className="flex justify-center text-3xl font-semibold text-blue my-6">
        Restaurants
      </div>
      <div className="mx-20 flex flex-col">
        <div className="flex flex-row items-center">
          <SearchBar />
          <AddItem />
        </div>
        <div className="restaurant_list_container mt-10 flex flex-row">
          {restaurant_list.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};
export default AllRestaurant;
