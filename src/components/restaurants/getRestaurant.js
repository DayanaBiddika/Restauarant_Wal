import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux';
import swal from 'sweetalert';

const GetAllRestaurants = () => {
    //state
    const [errorMessage, setErrorMessage] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const { userObj} = useSelector((state) => state.login);
  const [deleted,setDeleted]=useState(false)

  let navigate=useNavigate()
  
  //useEffect
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        //post request
        const response = await axios.get('http://localhost:2828/restaurant-api/get-restaurants');
        setRestaurants(response.data.payload);
      } catch (error) {
        console.error(error); 
      }
    };

    fetchRestaurants();
  }, [deleted]);

  const navigateToGetRestaurant=()=>{
    navigate('/pagination')
  }

  const navigateToSearch=()=>{
    navigate('/search-restaurant')
  }

  const navigateToUpdateResaturant=async(name)=>{
      navigate(`/update-restaurant`,{state:name})
  }

  const navigateToDeleteRestaurant=async(id)=>{
    try {
      const result = await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this restaurant!',
        icon: 'warning',
        buttons: ['Cancel', 'Delete'],
        dangerMode: true,
      });
      if(result){
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(`http://localhost:2828/user-api/delete-restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data) {
        // navigate('/get-restaurants');
        setDeleted(true)
        swal('Deleted!', 'The restaurant has been deleted successfully!', 'success');
      }
    }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error occurred while deleting the restaurant');
      setDeleted(false)
    }
  };
    // navigate(`/delete-restaurant`,{state:id})

  const canUpdateOrDelete = userObj.role=== 'Admin' || userObj.role === 'restaurantOwner';


  return (
    <div className='table-responsive'>
      <h2 className='text-center mb-1'>All Restaurants</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <button className="btn btn-warning btn-sm float-end" onClick={()=>navigateToGetRestaurant()}>Pagination</button>
      <button className="btn btn-warning btn-sm float-end me-5" onClick={()=>navigateToSearch()}>Search</button>
      <table className='table mb-5'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Address id</th>
            <th>NAME</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Updated At</th>
            <th>Updated By</th>
            <th>Deleted At</th>
            <th>Deleted By</th>
            {canUpdateOrDelete && <th>Updation</th>}
            {canUpdateOrDelete && <th>Deletion</th>}
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant,index) => (
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
              {canUpdateOrDelete && (
                <React.Fragment>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigateToUpdateResaturant(restaurant.name)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => navigateToDeleteRestaurant(restaurant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </React.Fragment>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      

    </div>
  );
};

export default GetAllRestaurants;
