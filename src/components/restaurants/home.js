import React from 'react';
import { useNavigate} from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    const handleButtonClick = (route) => {
      navigate(route);
    };

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">Create</h2>
            <button className="btn btn-primary" onClick={() => handleButtonClick('/create-restaurant')}>
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">Restaurants</h2>
            <button className="btn btn-primary" onClick={() => handleButtonClick('/get-restaurants')}>
              Get Restaurants
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home