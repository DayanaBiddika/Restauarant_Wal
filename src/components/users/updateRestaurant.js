import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation,useNavigate } from "react-router-dom";

const UpdateRestaurant = () => {
  let { state } = useLocation();
  console.log("state",state)

  const [showModal, setShowModal] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, reset } = useForm();

  let navigate=useNavigate()

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
    setErrorMessage('');
    navigate('/get-restaurants')
  };

  const handleUpdateRestaurant = async (newName) => {
    console.log("name",newName)
    try {
      let token=sessionStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:2828/user-api/update-restaurant/${state}`,
         newName,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
         }
      );
      console.log(response.data);
      handleCloseModal();
        
      
    } catch (error) {
      console.error(error);
      setErrorMessage('Error occurred while updating the restaurant');
    }
  };

  return (
    <div>
      {/* <Button variant="primary" onClick={() => setShowModal(true)}>
        Update Restaurant
      </Button> */}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdateRestaurant)}>
            <label htmlFor="newName">New Name:</label>
            <input
              type="text"
              id="newName"
              {...register('newName')}
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateRestaurant;
