import asyncHandler from 'express-async-handler'
import generatetoken from '../utils/generateToken.js'
import User from './../models/userModel.js'

// @desc Auth user & Get token
// @POST /api/user/login
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

export { authUser, getUserProfile }
