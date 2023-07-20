import React from 'react'
import {Link} from 'react-router-dom'

import './Header.scss'
import logo from '../../img/logo.svg'

import { Nav, Navbar, Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuth } from '../../redux/slices/auth'

const Header = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const onClickLogout = () => {
   dispatch(logout())
   window.localStorage.removeItem('token')
  }

  return (
   <>
      <Navbar collapseOnSelect expand='lg' bg='dark' data-bs-theme='dark' className='p-10'>
         <Container>
            <Navbar.Brand href='/' className='d-flex logo'>
               <img 
                  src={logo} 
                  alt='logo' 
                  className='d-block'
               />
               <h1 className='logo__text'>Collections</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end hamburger'>
            <Form className='d-flex mx-4 search'>
               <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                  size='sm'
               />
              <Button variant='outline-secondary' size='sm'>Search</Button>
          </Form>
               <Nav className='header__buttons'>
               {isAuth ? (
               <>
                  <Link to='/collections/create'>
                  <Button variant='outline-light' size='sm'>Create Collection</Button>
                  </Link>
                  <Link to='/account'>
                  <Button variant='outline-light' size='sm'>Your Account</Button>
                  </Link>
                  <Button variant='outline-light' size='sm' onClick={onClickLogout}>Log Out</Button>
               </>
               ) : (
               <>
                  <Link to='/login'>
                     <Button variant='outline-light' size='sm'>Log In</Button>
                  </Link>
                  <Link to='/register'>
                     <Button variant='outline-light' size='sm'>Sign Up</Button>
                  </Link>
               </>
               )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
  </>
  )
}
 
export default Header