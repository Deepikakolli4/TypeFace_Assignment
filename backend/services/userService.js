import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const registerUserService = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, passwordHash });
    return await newUser.save();

  } catch (err) {
    console.log('Error in registerUserService:', err.message);
    throw err;  
  }
};

const loginUserService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    return { token, user };

  } catch (err) {
    console.log('Error in loginUserService:', err.message);
    throw err;  
  }
};

export default { registerUserService, loginUserService };
