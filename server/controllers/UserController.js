const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({ deleted: 0 }).select('-password').sort('name').lean();

  // No users
  if (!users.length) {
    return res.status(400).json({ message: 'No users found.' });
  }

  res.json(users);
};

// Get single user
const getUser = async (req, res) => {
  const { id } = req.params;

  // if mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'No user with that id' });
  }

  const user = await User.findById(id).find().select('-password');

  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { name, email, password, contact_no, photo, user_type } = req.body;

  // Field Validation
  if (!name || !email || !password || !contact_no || !user_type) {
    return res.status(400).json({ message: 'Please fill in required fields.' });
  }

  // Email exists
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return res.status(409).json({ message: 'Email has already been registered' });
  }

  // Check password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be up to 6 characters' });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    contact_no,
    photo,
    user_type,
  });

  if (user) {
    //created
    res.status(201).json({ message: `New user ${name} created.` });
  } else {
    res.status(400).json({ message: 'Invalid user data received.' });
  }
};

const updateUser = async (req, res) => {
  const { id, name, email, contact_no, photo, user_type } = req.body;

  // Confirm data
  if (!id || !name || !email || !contact_no || !user_type) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // / if mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'No user with that id' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  // Check for duplicate
  const emailExists = await User.findOne({ email })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (emailExists && emailExists?._id.toString() !== id) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  user.name = name;
  user.email = email;
  user.contact_no = contact_no;
  // user.photo = photo;
  user.user_type = user_type;

  const updatedUser = await user.save();

  res.status(200).json({ message: `${updatedUser.name} updated.` });
};

const deleteUser = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'User ID not found.' });
  }

  // / if mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'No user with that id' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  user.deleted = 1;

  const deletedUser = await user.save();

  res.status(200).json({ message: `${deletedUser.name} deleted.` });
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
