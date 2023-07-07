import React, { useState } from 'react';
import axios from 'axios';

const SearchRestaurants = () => {
  const [name, setName] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:2828/restaurant-api/get/${name}`);
      console.log('response:', response.data.payload);

      // Check if response.data is an array
      if (Array.isArray(response.data.payload)) {
        setRestaurants(response.data.payload);
      } else {
        setError('Invalid response: Restaurants not found');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to search for restaurants');
    }
  };

  return (
    <div>
      <h2 className="text-center">Search Restaurants</h2>
      {error && <div className="text-danger text-center">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>

        <button className="btn btn-primary mt-4">Search</button>
      </form>

      {restaurants && restaurants.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>{restaurant._source.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchRestaurants;
