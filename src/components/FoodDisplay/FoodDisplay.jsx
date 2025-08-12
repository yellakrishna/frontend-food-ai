import React, { useContext, useState, useEffect } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from "../../Context/StoreContext.jsx"; // ✅ named export

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  // Simulate waiting for data load from context
  useEffect(() => {
    if (Array.isArray(food_list)) {
      // Wait until data is fetched at least once
      setLoading(false);
    }
  }, [food_list]);

  return (
    <div className='food-display' id='food-display'>
      <h2>Fresh and Tasty</h2>

      {loading ? (
        <div className="food-loading">
          <div className="spinner"></div>
          <p>Loading menu...</p>
        </div>
      ) : (
        <div className='food-display-list'>
          <div className="food-grid">
            {Array.isArray(food_list) && food_list.length > 0 ? (
              food_list
                .filter(item => category === "All" || category === item.category)
                .map(item => (
                  <FoodItem
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    desc={item.description}
                    price={item.price}
                    id={item._id}
                  />
                ))
            ) : (
              <p className='no-food-message'>No food items available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
