const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyOwnerToken = expressAsyncHandler(async (req, res, next) => {
  try {
    // Get the token from the "Authorization" header
    const bearerToken = req.headers.authorization;

    // If there is no bearer token
    if (!bearerToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // If there is a token, check its validity
    const token = bearerToken.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).send({ message: "Invalid token" });
      }

      if (decoded.role === "restaurantOwner") {
        // Add the user role to the request object
        req.user = decoded;

        next(); // Proceed to the next middleware or route handler
      } else {
        res.status(403).send({ message: "You do not have permission to update a restaurant" });
      }
    });
  } catch (error) {
    console.error(error);
    
  }
});

module.exports = verifyOwnerToken;
