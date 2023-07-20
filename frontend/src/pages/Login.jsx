import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { fetchAuth, selectIsAuth } from '../redux/slices/auth'

const Login = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  const {
    register, 
    handleSubmit, 
    formState: {isValid}
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if(!data.payload) {
      return alert('Failed to log in')
    }

    if(data.payload.token) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return <Navigate to='/' />
  }

  return ( 
    <Container className='d-flex flex-column justify-content-center align-items-center'>
      <h2 className='py-4'>Login</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId='fromBasicEmail' className='pb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control required type='email' placeholder='Enter your email' {...register('email', {required: 'Enter your email'})}></Form.Control>
          </Form.Group>
          <Form.Group controlId='fromBasicPassword' className='pb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='Enter your password' {...register('password', {required: 'Enter your password'})}></Form.Control>
          </Form.Group>
          <Button disabled={!isValid} variant="dark" type="submit">
            Submit
          </Button>
        </Form>
    </Container>
   )
}
 
export default Login