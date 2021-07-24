import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Searchbox = ({ history }) => {
  const [keyword, setkeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => {
          setkeyword(e.target.value)
        }}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' className='p-2' variant='outline-success'>
        Search
      </Button>
    </Form>
  )
}

export default Searchbox
