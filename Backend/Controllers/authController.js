import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Function to generate a JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '15d' }
  );
};

// Register a new user (either patient or doctor)
export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    // Check if a user with the given email already exists
    let existingUser;
    if (role === 'patient') {
      existingUser = await User.findOne({ email });
    } else if (role === 'doctor') {
      existingUser = await Doctor.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user (patient or doctor)
    let newUser;
    if (role === 'patient') {
      newUser = new User({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    } else if (role === 'doctor') {
      newUser = new Doctor({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User successfully created',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ success: false, message: 'Internal server error. Try again later.' });
  }
};

// Login an existing user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email (in either User or Doctor collections)
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    let user = patient || doctor;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ status: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user);

    // Remove sensitive data (like password) from user object before sending the response
    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      status: true,
      message: 'Successfully logged in',
      token,
      user: userData,
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ status: false, message: 'Failed to login. Please try again later.' });
  }
};
