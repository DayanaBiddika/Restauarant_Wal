// import bcryptjs
const bcryptjs = require("bcryptjs");

// import jwt
const jwt = require("jsonwebtoken");

//import email queue
const sendMailQueue=require("../emailQueue")


// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");

require("dotenv").config();

//import user
const userModel=require('../models/user')

//import db from index.js
const db=require('../models/index')
//import datatypes
const {DataTypes}=require('sequelize');

//import the validateSignUp
const { validateSignUp,validateLogin } = require("../validators/validator");

//calling user
let User=db.User



// Register a user
const registerUser = expressAsyncHandler(async (req, res) => {
  const { error, value } = validateSignUp(req.body);
  if (error) {
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
  try {
    const { firstName, lastName, email, role, password } = req.body;

    // Check if all required properties are present in the request body
    if (!firstName || !lastName || !email || !role || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if the user with the email already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists with that email' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create the user
    await User.create({ firstName, lastName, email, role, password: hashedPassword });

    
    // Enqueue the email sending task
    await sendMailQueue.add({
      to: req.body.email,
      subject: 'Welcome to YourApp',
      text: 'Welcome to YourApp! Thank you for registering.',
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
  }
});

  // Login a user
const loginUser= expressAsyncHandler(async (req, res) => {
  const {error,value}=validateLogin(req.body)
  
  if(error){
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({ errors: validationErrors });
  }
    try {
      const { email, password } = req.body;
  
      // Check if all required properties are present in the request body
      if (!email || !password) {
        return res.status(400).send({ message: 'Please provide email and password' });
      }
  
      // Find the user by email
      const user = await User.findOne({ where: { email } });
  
      // If user doesn't exist
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      console.log("------------",user)
  
      // Compare the password
      const passwordMatch = await bcryptjs.compare(password, user.password);
  
      // If password doesn't match
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      let token = jwt.sign({ email: user.email,role:user.role }, process.env.SECRET_KEY, { expiresIn: '1d' });
    //   token=token+`.${user.role}`
      console.log(token)
      // Send the token and user information in the response
      res.send({
        message: 'success',
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

  module.exports={registerUser,loginUser}