import {React,useState} from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registers = () => {
  const navigate = useNavigate();

   //taking state for error
   let [err,setErr]=useState("")

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
    },
    onSubmit: async (userObj) => {

      console.log("-------",userObj)
      
      try {
        const res = await axios.post(
          'http://localhost:2828/user-api/register-user',
          userObj
          
        );
        console.log("--------------",res)
        if (res.status === 201) {
          navigate('/login');
        }
      } catch (err) {
        console.log('error', err);
        setErr("Failed to Register");
      }
    },
  });

  return (
    <div>
        <h2 className=" mb-3 text-center">Registration Form</h2>
        {err && <h5 className="text-danger">{err}</h5>}
      <div className='card w-50 shadow p-3 mt-3  mx-auto'>
                <form onSubmit={formik.handleSubmit} className='ms-5'>
                  <div className='row'>
                  <div className='mb-3'>
                    <label htmlFor='firstName'>firstName:</label>
                    <input
                      type='text'
                      id='firstName'
                      placeholder='firstName'
                      name='firstName'
                      className='form-control w-75'
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.firstName && (
                      <div className='text-danger'>
                        <strong>{formik.errors.firstName}</strong>
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='lastName'>lastName:</label>
                    <input
                      type='text'
                      id='lastName'
                      placeholder='lastName'
                      className='form-control w-75'

                      name='lastName'
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && (
                      <div className='text-danger'>
                        <strong>{formik.errors.lastName}</strong>
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='email'>email:</label>
                    <input
                      type='text'
                      className='form-control w-75'

                      id='email'
                      name='email'
                      placeholder='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <div className='text-danger'>
                        <strong>{formik.errors.email}</strong>
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='role'>role:</label>
                    <input
                      type='text'
                      id='role'
                      placeholder='role'
                      className='form-control w-75'

                      name='role'
                      value={formik.values.role}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.role && (
                      <div className='text-danger'>
                        <strong>{formik.errors.role}</strong>
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password'>password:</label>
                    <input
                      type='password'
                      id='password'
                      placeholder='password'
                      className='form-control w-75'

                      name='password'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                      <div className='text-danger'>
                        <strong>{formik.errors.password}</strong>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type='submit'
                      className='btn btn-success me-5'
                    >
                      submit
                    </button>
                  </div>
                  </div>
                </form>
                </div>
                </div>
  )}

  export default Registers;

































