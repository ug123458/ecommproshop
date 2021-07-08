const express = require('express')
const products = require('../backend/Data/products')
const app = express()

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

app.listen(5000, console.log('server started on port 5000'))
