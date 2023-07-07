// create restaurantApp mini express application
const express = require("express");

const restaurantApp = express.Router();
restaurantApp.use(express.json());

//import controllers from restaurant controller

const {createRestaurant, getRestaurants,getAllFiltered, searchRestaurants, getAllRestaurants, sortedRestaurants, filteredRestaurants, searchRestaurants1, createAddress}=require("../controllers/restaurant.controller")

const token=require('../middlewares/verifyToken')

const verifyRoleToken=require('../middlewares/verifyRoleToken')

//create restaurant
restaurantApp.post("/restaurants",verifyRoleToken,createRestaurant)

//get restaurant by pagination
restaurantApp.get("/get-restaurant/:page/:pageSize",getRestaurants)

//search the restaurant
// restaurantApp.get("/search-restaurant",searchRestaurants)

//get all restaurants
restaurantApp.get("/get-restaurants",getAllRestaurants)

//sorted restaurants
restaurantApp.get("/sorted-restaurants",sortedRestaurants)

//filter restaurants
restaurantApp.get("/filter-restaurant/:keyword",filteredRestaurants)

restaurantApp.get("/restaurants",getAllFiltered)

restaurantApp.post("/address",createAddress)

restaurantApp.get("/search-restaurant/:searchValue",searchRestaurants1)


//export
module.exports=restaurantApp;