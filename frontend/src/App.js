import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Head from './components/Head'
import Foot from './components/Foot'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
const App = () => {
  return (
    <Router>
      <Head />
      <main>
        <Container className='py-3'>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Foot />
    </Router>
  )
}

export default App
