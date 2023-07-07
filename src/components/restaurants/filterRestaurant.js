import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilteredRestaurants = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getData = async ()=>{
    const response = await axios.get(`http://localhost:2828/restaurant-api/restaurants`);
    setFilteredData(response.data.payload);
  }

  const handleFilter = async (event) => {
    try {
      let response=[]
        let keyword = event.target.value
        if(keyword.length!==0){
          response = await axios.get(`http://localhost:2828/restaurant-api/filter-restaurant/${keyword}`);
        setFilteredData(response.data.payload);
        }
        else
        getData()
      setErrorMessage('');
    }
    catch (error) {
      setErrorMessage('Error occurred while filtering restaurants');
      setFilteredData(null);
    }
  };

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="container">
      <h1 className="mt-4">Filtered Restaurants</h1>
      <div className="row">
        <div>
          <input type="text" onChange={handleFilter} placeholder='Search by Name or Address'/>
        </div>
          
      </div>

      {errorMessage && <p className="text-danger mt-4">{errorMessage}</p>}

        <div className="mt-4">
          <h2>Filtered Restaurants:</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address Line 1</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((restaurant, index) => (
                <tr key={index}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.Address.addressLine1}</td>
                  <td>{restaurant.Address.city}</td>
                  <td>{restaurant.Address.state}</td>
                  <td>{restaurant.Address.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default FilteredRestaurants;
