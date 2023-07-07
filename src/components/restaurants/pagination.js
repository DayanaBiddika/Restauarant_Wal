import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetAllRestaurantsByPagination = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const pageSize = 6; // Number of restaurants per page

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:2828/restaurant-api/get-restaurant/${page}/${pageSize}`);
        setRestaurants(response.data.data);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching restaurants');
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const navigateToSorted = () => {
    navigate('/sort-restaurant');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="mt-4">All Restaurants</h2>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Address ID</th>
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
          {restaurants.length &&
            restaurants.map((restaurant, index) => (
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

      <div className="pagination mt-4 justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
          <button key={pageNum} className={`page-button ${pageNum === page ? 'active' : ''}`} onClick={() => handlePageChange(pageNum)}>
            {pageNum}
          </button>
        ))}
      </div>
      <button className="btn btn-warning btn-sm float-end" onClick={navigateToSorted}>
        Sort
      </button>
    </div>
  );
};

export default GetAllRestaurantsByPagination;
