
// import express
const express = require("express");

//import userapp
const userApp=require('./routes/user.route')

//import restaurantApp
const restaurantApp=require('./routes/restaurant.route')

//import db from index.js
const db=require('./models/index')

//import datatypes
const {DataTypes}=require('sequelize')

const exp=require('express');

const cors=require("cors")

const app=express();
// Middleware
app.use(express.json());

app.use(cors())

require('dotenv').config()

const PORT=process.env.PORT||2828;
app.listen(PORT,()=>console.log(`http server running on ${PORT}....`))

 //connecting build of react app to server of backend
 const path=require("path")
 app.use(express.static(path.join(__dirname,'../build')))

//calling user
let User=db.User

//calling Restaurant
let Restaurant=db.Restaurant


//path middleware for user
app.use("/user-api", userApp);

//path middleware for restaurant

app.use("/restaurant-api",restaurantApp)

//page refresh
app.use((req,res)=>{
  res.sendFile(path.join(__dirname,"../build/index.html"))
})

// invalid path
app.use("*", (req, res) => {
    res.send({ message: "Invalid path" });
  });
  // error handling middleware
  app.use((err, req, res, next) => {
    res.send({ message: err.message });
  });

//export the app
module.exports=app;





// var express = require('express');
// var app = express();
// const Queue = require('bull');
// const Arena = require('bull-arena');

// const arenaConfig = Arena({
//     Bull: Queue,
//     queues: [
//       {
//         type: 'bull',
//         name: "Notification_Emailer",
//         hostId: "MyAwesomeQueues",
//         redis: {
//           port: 6379,
//           host: '127.0.0.1',
//         },
//       },
//     ],
//   },
//   {
//     basePath: '/arena',
//     disableListen: true,
//   });
  
// const demoQueue = new Queue('Notification_Emailer', 'redis://127.0.0.1:6379');

// demoQueue.process(function (job, done) {
//     console.log("Demo Queue ===> ", job.data);
//     setTimeout(() => {
//       done();
//     }, 20000);
// });

// app.use('/', arenaConfig);

// app.get('/', function (req, res) {
//   demoQueue.add({ id: 2 });
//   res.send('Hello World!');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });


  
  

