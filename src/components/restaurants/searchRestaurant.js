import React, { useState } from 'react';
import axios from 'axios';


const SearchRestaurant = () => {
  // const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [address, setAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const[restaurant,setRestaurant]=useState()

  const handleSearch = async () => {
    try {
      // if (!searchType || !searchValue) {
      //   setErrorMessage('Please select a search criteria and enter a value');
      //   setRestaurantData(null);
      //   return;
      // }

      // const params = {
      //   [searchType]: searchValue,
      // };

      // console.log("--------",params)
      console.log(searchValue)

      const response = await axios.get(`http://localhost:2828/restaurant-api/search-restaurant/${searchValue}`);
      console.log(response)
      setRestaurant(response.data.restaurant)
      setAddress(response.data.address[0]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Restaurant not found');
      setAddress(null);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Restaurant Search</h1>
      <div className="row">
        <div className="col-lg-4">
          {/* <div className="form-group">
            <label htmlFor="searchType">Search Criteria:</label>
            <select
              id="searchType"
              className="form-control"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="">Select Criteria</option>
              <option value="name">Name</option>
              <option value="city">City</option>
              <option value="state">State</option>
              <option value="country">Country</option>
            </select>
          </div> */}
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="searchValue">Search Value:</label>
            <input
              type="text"
              id="searchValue"
              className="form-control"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <button className="btn btn-primary mt-4" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {errorMessage && <p className="text-danger mt-4">{errorMessage}</p>}

      {restaurant && (
        <div className="mt-4">
          <h2>Restaurants found:</h2>
          <table className="table">
            <thead>
              <tr>
               
              <th>Name</th>
              <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
             { restaurant.map((restaurant,index)=><tr key={index}>
            {/* <td>{restaurant._source.name}</td> */}
            <td>{restaurant._source.name}</td>
             <td>{address._source.city}</td>
             <td>{address._source.state}</td>
            <td>{address._source.country}</td>
            <td>{address._source.pincode}</td>
          </tr>)}
             
            </tbody>
            </table>
            </div>
      )}
      </div>
  )
  }
  
  export default SearchRestaurant;





