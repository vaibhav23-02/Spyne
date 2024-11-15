import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};