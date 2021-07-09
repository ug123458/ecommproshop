import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './Data/users.js'
import products from './Data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdusers = await User.insertMany(users)
    const adminuser = createdusers[0].id

    const sampleproducts = products.map((product) => {
      return { ...product, user: adminuser }
    })

    await Product.insertMany(sampleproducts)
    console.log('data imported')
  } catch (error) {
    console.log(error)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('data deleted')
  } catch (error) {
    console.log(error)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
