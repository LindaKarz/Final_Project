import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import  Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import CreateCollection from './pages/CreateCollection.jsx'


import { Container } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth.js'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
     <Header />
     <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/collections/create" element={<CreateCollection />} />
        </Routes>
     </Container>
    </>
  )
}

export default App
