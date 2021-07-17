import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/Ordercontroller.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(getOrderById)
export default router
