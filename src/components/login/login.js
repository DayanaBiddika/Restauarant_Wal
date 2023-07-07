import React, { useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../slices/loginSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userObj,errorMessage, status } = useSelector((state) => state.login)
  //state
  const [succeeed,setSucceed]=useState('')


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(userLogin(values));
    },
  });

  useEffect(() => {
    if (status === 'success') {
      if (userObj.role === 'Admin' || userObj.role === 'restaurantOwner' || userObj.role==='user') {
        setSucceed('logged in successfully')
        // navigate('/create-restaurant');
        navigate('/home')
      } else {
        navigate('/');
      }
    }
  }, [status, navigate, userObj]);

  return (
<div className=" row justify-content-md-center">
        <h2 className=" text-center">Login Form</h2>
        <div className='card  shadow col-sm-8 col-lg-5 '>
                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                {succeeed && <p className='text-success'>{succeeed}</p>}
                <form onSubmit={formik.handleSubmit} className='p-5 mt-4'>


                  <div className='mb-3'>
                    <label htmlFor='email' className='form-control-label '>Email:</label>
                    <input
                      type='text'
                      id='email'
                      name='email'
                      placeholder='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className='form-control w-75 mt-2'
                    />
                    {formik.errors.email && (
                      <div className='text-danger'>
                        <strong>{formik.errors.email}</strong>
                      </div>
                    )}
                  </div>
                  
                  <div className='mb-3'>
                    <label htmlFor='password'>Password:</label>
                    <input
                      type='password'
                      id='password'
                      placeholder='password'
                      name='password'
                      className='form-control w-75 mt-2'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                      <div className='text-danger'>
                        <strong>{formik.errors.password}</strong>
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <button type='submit' className='btn btn-success '>
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          
  );
};

export default Login;















