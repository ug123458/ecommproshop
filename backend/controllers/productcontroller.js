import asyncHandler from 'express-async-handler'
import Product from './../models/productModel.js'

// @desc Fetch all products
// @GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch single products
// @GET /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

// @desc Delete a product
// @Delete /api/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

// @desc Create a product
// @Post /api/products
// @access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpeg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201)
  res.json(createdProduct)
})

// @desc Update a product
// @Put /api/products/:id
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, category, image, description, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
  } else {
    res.status(404)
    throw new Error('Product not found')
  }

  const updatedProduct = await product.save()
  res.status(201).json(updatedProduct)
})

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
}
