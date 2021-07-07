import React from "react"
import { Container } from "react-bootstrap"
import Head from "./components/Head"
import Foot from "./components/Foot"
import HomeScreen from "./Screens/HomeScreen"
const App = () => {
  return (
    <>
      <Head />
      <main>
        <Container className='py-3'>
          <HomeScreen />
        </Container>
      </main>
      <Foot />
    </>
  )
}

export default App
