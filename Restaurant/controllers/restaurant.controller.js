
// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

require("dotenv").config();


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



//import restaurant

const restaurant=require("../models/restaurant")

const address=require("../models/address")


//import db from index.js
const db=require('../models/index')
//import datatypes
const {DataTypes}=require('sequelize')

const { Op } = require('sequelize');

const { validateRestaurant } = require("../validators/validator");
const { clear } = require("console");

//calling Restaurant
let Restaurant=db.Restaurant

//calling Address
let Address=db.Address

// create a restaurant
const createRestaurant = expressAsyncHandler(async (req, res) => {
  try {

    const { name, addressId } = req.body;
    const role = req.role;

    // Check if the user role is authorized to create a restaurant
    if (role !== 'Admin' && role !== 'restaurantOwner') {
      return res.status(403).json({ message: 'You have no permission. Unauthorized access' });
    }

    // Check if the provided addressId exists in the Address table
    const address = await Address.findByPk(addressId);
    if (!address) {
      return res.status(404).send({ message: 'Address not found' });
    }
    const response=await client.index({
      index:"restaurants",
      body:{
        name:req.body.name,
        addressId:req.body.addressId,
        createdAt:new Date(),
        createdBy:req.user.email,
        updatedAt:"",
        updatedBy:""
      }
    })

    // Create the restaurant with the associated addressId
    const restaurant = await Restaurant.create({ name, addressId });

    // Update createdBy and createdAt fields
    // console.log(req)
    restaurant.createdBy = req.user.email;
    restaurant.createdAt = new Date();

    await restaurant.save();

    res.status(201).send({ message: 'Restaurant created successfully', data: restaurant });
  } catch (error) {
    console.error(error);
  }
});

//create address
const createAddress = expressAsyncHandler(async (req, res) => {
  try {

    const { id,addressLine1,city,state,country,pincode } = req.body;
    const response=await client.index({
      index:"addresses",
      body:{
        id:req.body.id,
        addressLine1:req.body.addressLine1,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        pincode:req.body.pincode,
        createdAt:new Date(),
        updatedAt:""
      }
    })

    res.status(201).send({ message: 'Address created successfully', data: response });
  } catch (error) {
    console.error(error);
  }
});
  
  
  //get restaurant by pagination

  const getRestaurants = async (req, res) => {
    try {
      const { page, pageSize } = req.params;
  
      // Check if the page and page size are valid positive integers
      if (!Number.isInteger(+page) || !Number.isInteger(+pageSize) || page <= 0 || pageSize <= 0) {
        return res.status(400).json({ message: 'Invalid page or pageSize' });
      }
  
      // Fetch the total count of restaurants
      const totalCount = await Restaurant.count();
  
      // Calculate the total number of pages
      const totalPages = Math.ceil(totalCount / pageSize);
  
      // Calculate the offset based on the page and page size
      const offset = (page - 1) * pageSize;
  
      // Fetch restaurants with pagination using Sequelize
      const restaurants = await Restaurant.findAll({
        limit: parseInt(pageSize),
        offset: parseInt(offset),
      });
  
      res.send({
        message: 'Restaurants retrieved successfully',
        data: restaurants,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  //search restaurants on criteria
  const searchRestaurants1 = expressAsyncHandler(async (req, res) => {
    // const { name, city, state, country} = req.query;
   
    const searchValue=req.params.searchValue
   
   
    const keys = Object.keys(req.query);
    const response=await client.search({
      index:'restaurants',
      body:{
        query:{
          match:{
            name:searchValue
          }
        }
      }
    })

    console.log("---------response",response.hits.hits)
    let addressId=response.hits.hits.map((id)=>id._source.addressId   )

      console.log("-------",addressId)
        const address=await client.search({
          index: 'addresses',
        
      body: {
              query: {
               terms:{
                id:[...addressId]
               }
             },}
        })

    

   

    console.log("-----add",address.hits.hits)

    res.send({message:"Restaurants",address:address.hits.hits,restaurant:response.hits.hits})
    // //search based on name
  
    // const  body  = await client.search({
    //   index: '_all',
        
    //   body: {
    //           query: {
    //            terms:{
    //             addressId:[addressId]
    //            }
    //          },}
    // });
    // console.log(body.hits.hits)
    // res.status(200).json({ message: 'Restaurants found successfully',payload:response.hits.hits,restaurant:body.hits.hits});


  // }
  // else{
  //   // const fieldName= keys[0]
  //   // console.log("----filed",req.query.keys[0])
  //   let value;
  //   if(req.query.state){
  //     value=req.query.state
  //   }
  //   else if
  //     (req.query.country){
  //       value=req.query.country
  //     }
  //   else if
  //   (req.query.city){
  //     value=req.query.city
  //   }
  //     // console.log("value",value)
  //    body  = await client.search({
  //     index: 'addresses',
  //     body: {
  //         query: {
  //         multi_match:{
  //           query:value,
  //           fields:["city","state","country"]
  //         }
  //        },
  //     },
  //   });

  //  //getting restaurant name

  //  let addressId=body.hits.hits.map(resObj=>resObj._source.id)

  //  const body1  = await client.search({
  //   index: 'restaurants',
  //   
  //   },
  // });
 
  // // body.hits.restaurant=body1.hits.hits
  // console.log(body.hits.hits)
  // 
  
  
   
  // }
   
    
  
    // const restaurants = body.hits.hits.map((hit) => hit._source);
   
  
    // if (restaurants.length === 0) {
    //   return res.status(404).send({ message: 'Restaurant not found' });
    // }
    // const restaurants = body.hits.hits.map((hit) => hit._source);
    
    
    
  });

 const searchRestaurants=expressAsyncHandler(async(req,res)=>{
  const { name, city, state, country} = req.query;
  // console.log("----",req.query)
//   const keys = Object.keys(req.query);
//  console.log(keys);

  // Validate the query parameters
  if (!name && !city && !state && !country) {
    return res.status(400).json({ message: 'Please provide at least one search criteria' });
  }
const searchCriteria = {};

if (name) {
  searchCriteria ['$name$'] = {
      [Op.like]:"%"+name+"%"
    
  };
}
if (city) {
  searchCriteria['$Address.city$'] = {
    [Op.like]:"%"+city+"%"
  };
}
if (state) {
  searchCriteria['$Address.state$'] = {
    [Op.like]:"%"+state+"%"
  };
}
if (country) {
  searchCriteria['$Address.country$'] = {
    [Op.like]:"%"+country+"%"
  };
}

const restaurants = await db.Restaurant.findOne({
  include: [{ model: db.Address, where: searchCriteria }],
});

if (!restaurant) {
  return res.status(404).send({ message: 'Restaurant not found' });
}

res.status(200).send({ message: 'Restaurants found successfully', data: restaurants });
})



  //sort the restaurants on criteria

  const sortedRestaurants = expressAsyncHandler(async (req, res) => {
    try {
      const { sortBy, city, state, createdAt } = req.query;
  
      let sortField = 'name'; // Default sort field is 'name'
  
      // Check if sortBy query parameter is provided and valid
      if (sortBy) {
        const allowedSortFields = ['name', 'city', 'state', 'createdAt'];

        //validate
        if (!allowedSortFields.includes(sortBy)) {
          return res.status(400).send({ message: 'Invalid sortBy parameter' });
        }

        sortField = sortBy;
      }
  
      // Build the filter object based on the provided query parameters
      const filter = {};
  
      if (city) {
        filter.city = city;
      }
  
      if (state) {
        filter.state = state;
      }
  
      if (createdAt) {
        filter.createdAt = createdAt;
      }
  
      // Get the sorted restaurant list from the database
      const restaurants = await Restaurant.findAll({
        where: filter,
        order: [[sortField, 'ASC']],
      });
  
      res.status(200).send({ message: 'Sorted restaurant list', data: restaurants });
    } catch (error) {
      console.error(error);
    }
  });

  //filter the restaurants
  const filteredRestaurants = expressAsyncHandler(async (req, res) => {
      let keyword = req.params.keyword
    let addressIds = await db.Address.findAll({where:{
      [Op.or]:{
      addressLine1:{
        [Op.like]:`%${keyword}%`
      },
      city:{
        [Op.like]:`%${keyword}%`
      },
      state:{
        [Op.like]:`%${keyword}%`
      },
      country:{
        [Op.like]:`%${keyword}%`
      }
    }
    }})

      let addressIdsArray = addressIds.map((address)=>+(address.dataValues.id))
      let result = await db.Restaurant.findAll({where:{
        [Op.or]:{
          name:{
            [Op.like]:`%${keyword}%`
          },
          addressId:{
            [Op.in]:addressIdsArray
          }
        }
      },include:db.Address})

      res.send({payload:result})
  });
  

  //get all restaurants
const getAllRestaurants=expressAsyncHandler(async(req,res)=>{
  let restaurants=await Restaurant.findAll()
    res.send({message:"all users",payload:restaurants})
})

const getAllFiltered=expressAsyncHandler(async(req,res)=>{

  let result = await db.Restaurant.findAll({include:db.Address})
  res.send({message: "All restraunts",payload:result})
})



//export
module.exports={createRestaurant,getRestaurants,searchRestaurants,getAllRestaurants,sortedRestaurants,filteredRestaurants,getAllFiltered,searchRestaurants1,createAddress}
  

 