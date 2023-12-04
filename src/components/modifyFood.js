import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// 有新增之後，要調整一下。現在新增之後，刪除會一起被選起來
const ModifyFood = ({
  restaurantInfo,
  setRestaurantInfo,
  handleDeleteFoodSave,
  isNew,
}) => {
  const [addFood, setAddFood] = useState(false);
  const [deleteFood, setDeleteFood] = useState(false);
  const [showNumTip, setShowNumTip] = useState(false);
  const [newFood, setNewFood] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const handleShowAddFood = () => {
    if (addFood == true) {
      setAddFood(false);
    } else {
      setAddFood(true);
    }
  };

  const handleShowDeleteFood = () => {
    if (deleteFood == false) {
      setDeleteFood(true);
    } else {
      setDeleteFood(false);
    }
  };

  const handleAddFood = () => {
    const numNewPrice = parseFloat(newPrice);
    if (typeof numNewPrice === 'number' && newFood && numNewPrice) {
      setRestaurantInfo((prevRestaurantInfo) => {
        const newFoodItem = {
          // rid: restaurant.id,
          id: restaurantInfo.food.length,
          name: newFood,
          price: numNewPrice,
        };

        const updatedFood = [...prevRestaurantInfo.food, newFoodItem];

        return {
          ...prevRestaurantInfo,
          food: updatedFood,
        };
      });

      setNewFood('');
      setNewPrice('');
    } else {
      setShowNumTip(true);
    }
  };

  // 處理刪除中被選中的項目
  const handleCheckboxChange = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  // 處理刪除食物
  const handleDeleteFood = async () => {
    console.log(restaurantInfo.restaurant[0].id);
    const updatedFoodList = restaurantInfo.food.filter(
      (foodItem, index) => !selectedItems.includes(foodItem.id)
    );

    setRestaurantInfo((prevRestaurantInfo) => ({
      ...prevRestaurantInfo,
      food: updatedFoodList,
    }));

    if (restaurantInfo.restaurant[0].id !== undefined) {
      handleDeleteFoodSave(selectedItems);
    }
  };

  const handleChangeFoodInfo = (e, id, type) => {
    const updatedValue = e.target.textContent;

    setRestaurantInfo((prevRestaurantInfo) => {
      const updatedFood = prevRestaurantInfo.food.map((foodItem) => {
        if (foodItem.id === id) {
          return {
            ...foodItem,
            [type]: updatedValue,
          };
        }
        return foodItem;
      });

      return {
        ...prevRestaurantInfo,
        food: updatedFood,
      };
    });
  };

  return (
    <div className='py-4 flex flex-row'>
      <ul className='food_container flex flex-col content-between'>
        {restaurantInfo?.food.map((foodItem, index) => (
          <li
            key={index}
            className=' text-blue font-semibold flex flex-row items-center'
          >
            {deleteFood && (
              <div>
                <label
                  className='cursor-pointer flex items-center justify-center'
                  id={`food_${foodItem.id}`}
                />
                <input
                  id={`food_${foodItem.id}`}
                  type='checkbox'
                  checked={selectedItems.includes(foodItem.id)}
                  className='appearance-none w-4 h-4 mx-2 rounded focus:outline-none border-2 cursor-pointer border-blue checked:bg-yellow'
                  onChange={() => handleCheckboxChange(foodItem.id)}
                />
              </div>
            )}
            <div
              onInput={(e) => handleChangeFoodInfo(e, foodItem.id, 'name')}
              className='border-b-2 border-white focus:border-blue focus:border-b-2 focus:outline-none px-2 flex-1'
              contentEditable='true'
              suppressContentEditableWarning={true}
            >
              {foodItem?.name}
            </div>
            <div
              onInput={(e) => handleChangeFoodInfo(e, foodItem.id, 'price')}
              className='border-b-2 border-white focus:border-blue focus:border-b-2 focus:outline-none px-2'
              contentEditable='true'
              suppressContentEditableWarning={true}
            >
              {foodItem?.price}
            </div>
          </li>
        ))}
      </ul>

      <div className='modify_food_container flex flex-col items-center justify-between w-fit'>
        <div className='add relative flex items-center justify-center'>
          {isNew && (
            <div>
              <button
                className='border-2 bg-blue hover:bg-blue text-white hover:bg-blue/[0.9] focus:outline-none shadow-md font-bold py-2 px-2 mx-3 rounded text-center text-base flex justify-center items-center'
                onClick={handleShowAddFood}
              >
                <FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff' }} />
              </button>

              {addFood && (
                <div className='more_food_container flex rounded ml-2 px-2 py-2 absolute w-max left-full border-2'>
                  <div className='food flex flex-row w-1/2 mr-2 relative'>
                    {showNumTip && (
                      <span className='absolute top-full w-max bg-red text-white px-2 py-1.5 mt-4 -left-2.5 shadow-md rounded text-xs font-medium duration-100'>
                        Please Check Food is not empty & <br /> Price is number!
                      </span>
                    )}
                    <input
                      type='text'
                      value={newFood}
                      placeholder='food'
                      onChange={(e) => {
                        setShowNumTip(false);
                        setNewFood(e.target.value);
                      }}
                      className={`border-b-2 text-sm text-gray-700 font-medium px-1 bg-transparent focus:outline-none w-24 mx-1 ${
                        showNumTip
                          ? 'border-red focus:border-red'
                          : 'border-blue focus:border-yellow'
                      }`}
                    />
                  </div>
                  <div className='price flex flex-row relative'>
                    <div className='text-blue font-medium'>$ </div>
                    <input
                      type='num'
                      value={newPrice}
                      placeholder='num'
                      onChange={(e) => {
                        setShowNumTip(false);
                        setNewPrice(e.target.value);
                      }}
                      className={`border-b-2 text-sm text-gray-700 font-medium px-1 bg-transparent focus:outline-none w-12 mx-1 ${
                        showNumTip
                          ? 'border-red focus:border-red'
                          : 'border-blue focus:border-yellow'
                      }`}
                    />
                  </div>
                  <div className='mx-1'>
                    <button
                      className='bg-yellow hover:bg-blue text-white font-bold rounded text-center px-2 text-sm py-1 focus:outline-none'
                      onClick={handleAddFood}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className='delete relative flex items-center justify-center'>
          <button
            className='border-2 bg-blue hover:bg-blue text-white hover:bg-blue/[0.9] focus:outline-none shadow-md font-bold py-2 px-2 mx-3 rounded text-center text-base relative flex justify-center items-center'
            onClick={handleShowDeleteFood}
          >
            <FontAwesomeIcon icon={faMinus} style={{ color: '#ffffff' }} />
          </button>
          {deleteFood && (
            <div className='flex rounded ml-2 py-2 absolute w-max left-full '>
              <button
                className='bg-yellow hover:bg-blue text-white font-bold rounded text-center px-2 text-sm py-2 focus:outline-none'
                onClick={handleDeleteFood}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifyFood;
