import {useState,React} from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const CreateRestaurant = () => {
  const userToken = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('role');

  //state
  const [errorMessage,setErrorMessage]=useState('')
  const [done,setDone]=useState('')

  const formik = useFormik({
    initialValues: {
      name: '',
      addressId: ''
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Name is required';
      }

      if (!values.addressId) {
        errors.addressId = 'Address ID is required';
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (userToken && (userRole === 'Admin' || userRole === 'restaurantOwner')) {
          await axios.post('http://localhost:2828/restaurant-api/restaurants', values, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          console.log('Restaurant created', values);
          setDone('Restaurant created successfully')
          resetForm();
        } else {
          setErrorMessage('You have no access');
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  // const navigateToGetRestaurant = () => {
  //   navigate('/get-restaurants');
  // };

  // const navigateToCreateRestaurant=()=>{
  //   navigate('/create')
  // }

  return (
    <div className="container shadow w-50 pt-2 ps-5 pe-5 pb-5 ">
      <h2 className='text-center'>Create Restaurant</h2>
      {errorMessage && <div className="text-danger text-center">{errorMessage}</div>}
      {done && <div className='text-success text-center'>{done}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='name'
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
        </div>
        <div className="form-group mt-4">
          <label htmlFor="addressId">Address ID:</label>
          <input
            type="text"
            id="addressId"
            name="addressId"
            placeholder='address'
            className="form-control"
            value={formik.values.addressId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.addressId && formik.errors.addressId && (
            <div className="text-danger">{formik.errors.addressId}</div>
          )}
        </div>
        <div className="form-group mt-4">
          <button type="submit" className="btn btn-primary float-start">
            Create
          </button>
          {/* <button className="btn btn-warning   float-end" onClick={navigateToGetRestaurant}>
            Get Restaurants
          </button> */}
        </div>
      </form>
      {/* <button className="btn btn-warning float-end" onClick={navigateToCreateRestaurant}>Restaurant</button> */}
    </div>
  );
};

//export
export default CreateRestaurant;































