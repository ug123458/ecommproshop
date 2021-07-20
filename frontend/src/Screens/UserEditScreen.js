import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import { getUserDetails, updateUser } from './../action/userActions'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userconstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [isAdmin, setisAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingupdate,
    error: errorupdate,
    success: successupdate,
  } = userUpdate

  useEffect(() => {
    if (successupdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setname(user.name)
        setemail(user.email)
        setisAdmin(user.isAdmin)
      }
    }
  }, [user, dispatch, userId, successupdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({ _id: userId, name: name, email: email, isAdmin: isAdmin })
    )
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        GO BACK
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => {
                  setemail(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isadmin'>
              <Form.Label>Password</Form.Label>
              <Form.Check
                type='checkbox'
                label='isAdmin'
                checked={isAdmin}
                onChange={(e) => {
                  setisAdmin(e.target.checked)
                }}
              ></Form.Check>
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

export default UserEditScreen
