const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = async (req, res, next) => {
  // verify user is authenticated
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token.' });
    }
    req.user = user;
    next();
  });

  // try {
  //   const token = req.cookies.jwt;
  //   if (!token) {
  //     res.status(401);
  //     throw new Error('Authorization token required');
  //   }
  //   // Verify Token
  //   const verified = jwt.verify(token, process.env.JWT_SECRET);
  //   // Get user id from token
  //   const user = await User.findById(verified.id).select('-password');
  //   if (!user) {
  //     res.status(401);
  //     throw new Error('User not found');
  //   }
  //   req.user = user;
  //   next();
  // } catch (error) {
  //   res.status(401);
  //   throw new Error('Invalid Token');
  // }

  // let token;
  // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  //   try {
  //     token = req.headers.authorization.split(' ')[1];
  //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //     req.user = await User.findById(decoded.id).select('-password');
  //     next();
  //   } catch (error) {
  //     console.error(error);
  //     res.status(401).json({ message: 'Not authorized, token failed' });
  //   }
  // }
  // if (!token) {
  //   res.status(401).json({ message: 'Not authorized, no token' });
  // }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json({ message: 'You are not authorized!' });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as an admin');
  }
};

module.exports = verifyToken;
