import {generateToken,verifyToken} from '../utils/jwt.js';

export default (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(403).json({ error: 'Failed to authenticate token' });
  }
};