import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ElasticSearch = () => {
  const [name, setName] = useState('');
  const [created, setCreated] = useState('');
  const [error, setError] = useState('');

  const navigate=useNavigate();

  // Handle input changes
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("name",name)
     
      try {
        // console.log("----------",name)
        const response = await axios.post('http://localhost:2828/restaurant-api/create',{name});
        console.log("----------",name)
        console.log('response:', response.data);
        console.log("response",event)
        setCreated('Created successfully');
        // Handle success case
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to create restaurant');
        // Handle error case
      }
    };
    const navigateToElasticSearch=()=>{
      navigate('/search')
    }

  return (
    <div>
      <h2 className="text-center">Create Restaurant</h2>
      {error && <div className="text-danger text-center">{error}</div>}
      {created && <div className="text-success text-center">{created}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>

        <button className="btn btn-warning float-center mt-4">
          Create
        </button>
        <button className="btn btn-warning float-end" onClick={navigateToElasticSearch}>Search</button>
      </form>
    </div>
  );
};

export default ElasticSearch;
