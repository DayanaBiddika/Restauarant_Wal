import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const SortedRestaurantList = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  let navigate=useNavigate()

  useEffect(() => {
    fetchSortedRestaurants();
  }, []);

  const fetchSortedRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:2828/restaurant-api/sorted-restaurants');
      setRestaurantData(response.data.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to fetch sorted restaurants');
    }
  };

  const naviagteToFilter=()=>{
    navigate('/filter-restaurant')
  }

  return (
    <div className="container">
      <h1 className="mt-4 text-center">Sorted Restaurant List</h1>
      {errorMessage && <p className="text-danger mt-4">{errorMessage}</p>}

      {restaurantData.length > 0 ? (
        <div className="mt-4">
          <h2 className='text-center'>Restaurants found:</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Address Id</th>
                <th>Name</th>
                <th>Created At</th>
                <th>Created By</th>
                <th>Updated At</th>
                <th>Updated By</th>
                <th>Deleted At</th>
                <th>Deleted By</th>
              </tr>
            </thead>
            <tbody>
              {restaurantData.map((restaurant,index) => (
                <tr key={index}>
                     <td>{restaurant.id}</td>
                     <td>{restaurant.addressId}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.createdAt}</td>
                  <td>{restaurant.createdBy}</td>
                  <td>{restaurant.updatedAt}</td>
                  <td>{restaurant.updatedBy}</td>
                  <td>{restaurant.deletedAt}</td>
                  <td>{restaurant.deletedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No restaurants found</p>
      )}
      <button className="btn btn-warning top-0 mt-5 float-end display-block " style={{marginLeft:"40%"}} onClick={()=>naviagteToFilter()}>Filter</button>
    </div>
  );
};

export default SortedRestaurantList;
