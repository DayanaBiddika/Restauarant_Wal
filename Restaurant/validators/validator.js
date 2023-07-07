const Joi=require("joi");

const validator=(schema)=>(payload)=>schema.validate(payload,{abortEarly:false});

//for registration
const signUpSchema=Joi.object({
    firstName:Joi.string().min(4).max(10).required(),
    lastName:Joi.string().min(4).max(10).required(),
    email:Joi.string().email().required(),
    role:Joi.string().min(4).max(20).required(),
    password:Joi.string().min(4).max(15).required()
})

//for login
const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(4).max(15).required()
})

//for creation of restaurant
const createRestaurantSchema=Joi.object({
    name:Joi.string().required(),
    addressId:Joi.number().required()
})

//export the signUpSchema
exports.validateSignUp=validator(signUpSchema)

//export the loginSchema
exports.validateLogin=validator(loginSchema)

//export the create restaurant
exports.validateRestaurant=validator(createRestaurantSchema)
