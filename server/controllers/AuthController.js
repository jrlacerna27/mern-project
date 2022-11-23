const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check fileds
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check user if exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  // Check if password is match
  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return res.status(400).json({ message: 'Password Incorrect. ' });
  }

  // Generate token
  const token = generateToken(user._id);

  // Create secure cookie with refresh token
  res.cookie('jwt', token, {
    // path: '/',
    httpOnly: true, //accessible only by web server
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    // sameSite: 'None', //cross-site cookie
    // secure: true, //https
  });

  if (user && passwordCorrect) {
    const { name, email } = user;
    res.status(200).json({ name, email, token });
  } else {
    res.status(400).json({ message: 'Invalid email or password' });
  }
};

const loginStatus = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content

  res.clearCookie('jwt', { httpOnly: true });
  res.status(200).json({ message: 'Successfully Logged Out.' });
};

module.exports = { login, loginStatus, logout };
