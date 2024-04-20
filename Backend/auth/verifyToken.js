import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;

  // Check if token exists and has the correct format
  if (!authToken || !authToken.startsWith("Bearer")){
    return res.status(401).json({success:false, message:"No token, authorization denied"});
  }

  try {
    // Extract the token value
    const token = authToken.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Extract user ID and role from decoded token and add to request object
    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // Call the next middleware function
  } catch(err) {
    // Handle token verification errors
    if(err.name === "TokenExpiredError"){
      return res.status(401).json({message:"Token is Expired"});
    }
    return res.status(401).json({success:false, message:"Invalid Token"});
  }
};

export const restrict = roles => async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find user based on user ID
    const user = await User.findById(userId) || await Doctor.findById(userId);

    // If user not found or role not included in the allowed roles, deny access
    if (!user || !roles.includes(user.role)) {
      return res.status(401).json({success:false, message: "You're not authorized"});
    }

    next(); // Call the next middleware function
  } catch (err) {
    // Handle errors
    console.error("Restrict middleware error:", err);
    return res.status(500).json({success: false, message: "Internal Server Error"});
  }
};
