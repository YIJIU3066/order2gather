const RestaurantCard = ({ restaurant, index }) => {
  const colors = ["#7A989A", "#C1AE8D", "#849271"];
  const currentColor = colors[index % colors.length];
  
  return (
    <>
      <div className="restaurant_card_container flex flex-col items-center justify-center mr-6 cursor-pointer">
        <div className="w-44 h-32 mb-4 rounded" style={{ backgroundColor: currentColor }}/>
        <div className= "text-center font-semibold" style={{ color: currentColor }}>{restaurant.name}</div>
      </div>
    </>
  );
};

export default RestaurantCard;
