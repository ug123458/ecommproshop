import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import { notfound, errorhandler } from './middleware/errormiddleware.js'
const app = express()
app.use(express.json())

dotenv.config()

connectDB()

app.get('/', (req, res) => {
  res.send('API is Running')
})

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notfound)

app.use(errorhandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running on ${process.env.NODE_ENV} on port ${PORT}`)
)
