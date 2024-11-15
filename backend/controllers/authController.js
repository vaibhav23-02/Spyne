import User from '../models/userModel.js';
import {generateToken,verifyToken} from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = generateToken(user._id);
    console.log(token)
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};