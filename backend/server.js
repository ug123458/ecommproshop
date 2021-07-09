import express from 'express'
import dotenv from 'dotenv'
import products from '../backend/Data/products.js'
const app = express()
dotenv.config()

app.get('/', (req, res) => {
  res.send('API is Running')
})

app.get('/api/products', (req, res) => {
  res.send(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running on ${process.env.NODE_ENV} on port ${PORT}`)
)
