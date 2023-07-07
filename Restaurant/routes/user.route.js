// create userApp mini express application
const express = require("express");

const userApp = express.Router();

userApp.use(express.json());

// import middlewares from user middleware
const { registerUser, loginUser} = require("../middlewares/users.middlewares");

//import controllers from user controller

const {getUsers,deleteRestaurant, updateRestaurant,updateRestaurantIndex}=require("../controllers/user.controller");

const verifyAdminToken = require("../middlewares/verifyAdminToken");

const verifyOwnerToken=require("../middlewares/verifyOwnerToken")



//register user
userApp.post("/register-user",registerUser)

//login user

userApp.post("/login",loginUser)

//get users

userApp.get("/get-users",getUsers)


//delete restaurant
userApp.delete("/delete-restaurant/:id",verifyAdminToken,deleteRestaurant)

//update restaurant
userApp.put("/update-restaurant/:name",verifyOwnerToken,updateRestaurant)

userApp.put('/update',updateRestaurantIndex)





//export
module.exports=userApp;