import asyncHandler from 'express-async-handler'
import generatetoken from '../utils/generateToken.js'
import User from './../models/userModel.js'

// @desc Auth user & Get token
// @POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generatetoken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email and Password')
  }
})

// @desc Register new User
// @POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExits = await User.findOne({ email })

  if (userExits) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  })
  if (user) {
    res.status(201)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generatetoken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User data')
  }
})

// @desc Get user profile
// @GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Update user profile
// @PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updateduser = await user.save()
    res.json({
      id: updateduser._id,
      name: updateduser.name,
      email: updateduser.email,
      isAdmin: updateduser.isAdmin,
      token: generatetoken(updateduser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get all users
// @GET /api/users
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers }
