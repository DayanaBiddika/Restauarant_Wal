import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form'


const DeleteRestaurant = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  let {state}=useLocation();
  console.log("state",state)
  const {  handleSubmit} = useForm();

  const handleDeleteRestaurant = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(`http://localhost:2828/user-api/delete-restaurant/${state}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data) {
        navigate('/get-restaurants');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error occurred while deleting the restaurant');
    }
  };

  return (
    <div>
      <button className="delete-button" onClick={handleSubmit(handleDeleteRestaurant)}>
        Delete
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default DeleteRestaurant;
