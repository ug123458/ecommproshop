import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { orderCreateReducer } from './reducers/orderReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
})

const cartstorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfostorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingstorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const payment = JSON.parse(localStorage.getItem('paymentMethod'))

const intialState = {
  cart: {
    cartItems: cartstorage,
    shippingAddress: shippingstorage,
    paymentMethod: payment,
  },
  userLogin: { userInfo: userInfostorage },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
