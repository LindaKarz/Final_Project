import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { fetchRegister, selectIsAuth } from '../redux/slices/auth'

const Signup = () => {
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  const {
    register, 
    handleSubmit, 
    formState: {isValid}
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    console.log(data)

    if(!data.payload) {
      return alert('Failed to sign up')
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return <Navigate to='/' />
  }

  return ( 
    <Container className='d-flex flex-column justify-content-center align-items-center'>
      <h2 className='py-4'>Sign Up</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='fromBasicName' className='pb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Enter your name' {...register('name', {required: 'Enter your name'})}></Form.Control>
        </Form.Group>
        <Form.Group controlId='fromBasicEmail' className='pb-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter your email' {...register('email', {required: 'Enter your email'})}></Form.Control>
        </Form.Group>
        <Form.Group controlId='fromBasicPassword' className='pb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter your password' {...register('password', {required: 'Enter your password'})}></Form.Control>
        </Form.Group>
        <Button disabled={!isValid} variant="dark" type="submit">
           Submit
        </Button>
      </Form>
    </Container>
   )
}
 
export default Signup