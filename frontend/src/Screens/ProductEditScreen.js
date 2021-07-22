import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { listProductsDetails, updateProduct } from './../action/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productconstants'
import axios from 'axios'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [name, setname] = useState('')
  const [price, setprice] = useState(0)
  const [image, setimage] = useState('')
  const [brand, setbrand] = useState('')
  const [category, setcategory] = useState('')
  const [countInStock, setcountInStock] = useState(0)
  const [description, setdescription] = useState('')
  const [uploading, setuploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingupdate,
    error: errorupdate,
    success: successupdate,
  } = productUpdate

  useEffect(() => {
    if (successupdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || productId !== product._id) {
        dispatch(listProductsDetails(productId))
      } else {
        setname(product.name)
        setprice(product.price)
        setdescription(product.description)
        setcategory(product.category)
        setbrand(product.brand)
        setimage(product.image)
        setcountInStock(product.countInStock)
      }
    }
  }, [dispatch, history, productId, product, successupdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formdata = new FormData()
    formdata.append('image', file)
    setuploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/from-data',
        },
      }
      const { data } = await axios.post('/api/upload', formdata, config)
      setimage(data)
      setuploading(false)
    } catch (error) {
      console.error(error)
      setuploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        price,
        category,
        countInStock,
        description,
        brand,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        GO BACK
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingupdate && <Loader />}
        {errorupdate && <Message variant='danger'>{errorupdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => {
                  setname(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => {
                  setprice(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => {
                  setimage(e.target.value)
                }}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => {
                  setbrand(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => {
                  setcountInStock(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => {
                  setcategory(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Descriprion</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
