import './App.css';

//import createBrowser,RouterProvider
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

//import Rootlayout
import RootLayout from './RootLayout';

import Login from './components/login/login';

import Registers from './components/register/Registers';

import CreateRestaurant from './components/restaurants/createRestaurant';

import  GetAllRestaurants from './components/restaurants/getRestaurant';

import GetAllRestaurantsByPagination from './components/restaurants/pagination';

import SearchRestaurant from './components/restaurants/searchRestaurant';

import SortedRestaurantList from './components/restaurants/sortRestaurant';

import FilteredRestaurants from './components/restaurants/filterRestaurant';

import UpdateRestaurant from './components/users/updateRestaurant';

import DeleteRestaurant from './components/users/deleteRestaurant';

import ElasticSearch from './components/restaurants/elasticSearch';

import SearchRestaurants from './components/restaurants/searchElastic';

import Home from './components/restaurants/home';


function App() {
  const browserRouterObj=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Registers/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/create-restaurant',
          element:<CreateRestaurant/>
        },
        {
          path:'/get-restaurants',
          element:<GetAllRestaurants/>
        },
        {
          path:'/pagination',
          element:<GetAllRestaurantsByPagination/>
        },
        {
          path:'/search-restaurant',
          element:<SearchRestaurant/>
        },
        {
          path:'/sort-restaurant',
          element:<SortedRestaurantList/>
        },
        {
          path:'/filter-restaurant',
          element:<FilteredRestaurants/>
        },
        {
          path:'/update-restaurant',
          element:<UpdateRestaurant/>
        },
        {
          path:'/delete-restaurant',
          element:<DeleteRestaurant/>
        },
        {
          path:'/create',
          element:<ElasticSearch/>
        },
        {
          path:'/search',
          element:<SearchRestaurants/>
        },
        {
          path:'/home',
          element:<Home/>
        }
      ]
    }
  ])
  return (
    <div>   
      <RouterProvider router={browserRouterObj}/>
    </div>
  );
}

export default App;
