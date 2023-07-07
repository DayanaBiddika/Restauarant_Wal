// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

// Import Elasticsearch and other required modules
const { Client } = require('@elastic/elasticsearch');

// Create an Elasticsearch client
const client = new Client({ node: `https://localhost:9200`,auth:{
  username:"elastic",
  password:"T0lV5tk89qCBLmmzlw23"
},tls: {
  //  ca: fs.readFileSync('./http_ca.crt'),
  rejectUnauthorized: false,
},});


//import user
const userModel=require('../models/user')

//import db from index.js
const db=require('../models/index')

//import restaurant
const restaurants=require('../models/restaurant')

//calling User
let User=db.User

//calling restaurant
let Restaurant=db.Restaurant

//get users
const getUsers=expressAsyncHandler(async(req,res)=>{
    let users=await User.findAll({
      attributes:{exclude:["password"]}
    })
    res.send({message:"all users",payload:users})
});

//delete restaurant

const deleteRestaurant = expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the user is an admin
      if (req.user && req.user.role !== 'Admin' && req.user && req.user.role!=='restaurantOwner') {
        return res.status(403).send({ message: 'You do not have permission to delete a restaurant' });
      }

        // Validate the ID parameter
    if (!id) {
      return res.status(400).send({ message: 'Invalid restaurant ID' });
    }
  
      // Find the restaurant by ID
      const restaurant = await Restaurant.findOne({ where: { id } });
  
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
  
      // Perform soft delete by updating the deletedAt and deletedBy fields
      const updatedRestaurant = await restaurant.update({
        deletedAt: new Date(),
        deletedBy: req.user.email,
      });
  
      if (!updatedRestaurant) {
        return res.status(500).send({ message: 'Failed to delete restaurant' });
      }
  
      res.status(200).send({ message: 'Restaurant deleted successfully' });
    } catch (error) {
      console.error(error);
  }});

  //update the restaurant
  const updateRestaurantIndex = async (name,newName) => {
    try {
      // const { name, newName } = req.body;
      // console.log("--------",id)
      const response = await client.updateByQuery({
        index:'restaurants',
        body: {
          query: {
            term: { name: name } // Match documents with the specified username
          },
          script: {
            source: `ctx._source.name = params.name`,
            params: { name: newName} // Update the specified field with the new value
          }
        }
      });
      // console.log(body.hits.hits)
      console.log(`Documents updated: ${response.updated}`);
    } catch (error) {
      console.error('Error updating documents:', error);
    }
   
  };
  

  //update the restaurant
  const updateRestaurant = expressAsyncHandler(async (req, res) => {
    try {
      const { name } = req.params;
      const { newName } = req.body;
  
      // Check if the user is authorized to update the restaurant
      if (req.user.role !== 'restaurantOwner' && req.user.role !== 'Admin') {
        return res.status(403).send({ message: 'You do not have permission to update a restaurant' });
      }

      // Validate the input data
    if (!name || !newName) {
      return res.status(400).json({ message: 'Invalid restaurant name or new name' });
    }
  
      // Find the restaurant by name
      const restaurant = await Restaurant.findOne({ where: { name } });
  
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
  
      // Update the restaurant details
      // console.log(req)
      restaurant.name = newName;
      restaurant.updatedBy = req.user.email;
      restaurant.updatedAt = new Date();
  
      await restaurant.save();

       // Update the restaurant in the Elasticsearch index
     await updateRestaurantIndex(name, newName);
  
      res.status(200).send({ message: 'Restaurant updated successfully', data: restaurant });
    } catch (error) {
      console.error(error);
    }
    // console.log(body.hits.hits)
  });
  
  
//export
module.exports={getUsers,deleteRestaurant,updateRestaurant,updateRestaurantIndex};