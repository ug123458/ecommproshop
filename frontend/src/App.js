import React from "react"
import {Container} from 'react-bootstrap'
import Head from "./components/Head"
import Foot from "./components/Foot"
const App = () => {
  return (
    <>
      <Head />
      <main>
        <Container className='py-3'>
          <h1>Welcome to Proshop</h1>
        </Container>
      </main>
      <Foot />
    </>
  )
}

export default App
