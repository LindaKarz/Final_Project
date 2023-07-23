import React, {useState} from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container, Form, Button, Row, Col } from 'react-bootstrap'

import { selectIsAuth } from '../redux/slices/auth'
import axios from '../axios.js'

const Create = () => {
  const navigate = useNavigate()

  const isAuth = useSelector(selectIsAuth)

  const [image, setImage] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)
  const inputRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      setImage(data.url)
    } catch(err) {
      console.warn(err)
      alert('Upload Error')
    }
  }

  const onClickRemoveImage = () => {
    setImage('')
  }

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [topic, setTopic] = useState('')

  function changeTopic(e) {
     setTopic(e.target.value)
  }

  const [field, setField] = useState('')
  const [type, setType] = useState('')

  function changeType(e) {
    setType(e.target.value)
 }


  const [show, setShow] = useState(false)

  const ShowItemForm = () => {
    if(show == true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  const onSubmit = async () => {
    try {
      setLoading(true)

      const fields = {
        title, 
        description, 
        topic, 
        image, 
        field, 
        type
      }

      const { data } = await axios.post('/collections', fields)

      const id = data._id

      navigate(`/collections/${id}`)

    } catch (err) {
      console.warn(err)
      alert('Upload Error')
    }
  }


  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/'/>
  }

  console.log({title, description, topic, field, type})
  

  return (
    <Container className='m-5'>
      <Form className='p-5'>
        <Button onClick={() => inputRef.current.click()} variant='dark'>
          Upload Image
        </Button>
        <input ref={inputRef} type='file' onChange={handleChangeFile} hidden />
        {image && (
          <>
            <Button variant='danger' onClick={onClickRemoveImage} className='m-2'>
            Delete
            </Button>
            <img  src={`http://localhost:4444${image}`} alt='Uploaded' style={{maxWidth: 360}}/>
          </>
        )}
        <br />
        <br />

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={e => setTitle(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)}/>
        </Form.Group>

        <Form.Select className='mb-4' value={topic} onChange={changeTopic}>
          <option disabled>Topic</option>
          <option value="Books">Books</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Comics">Comics</option>
          <option value="Pictures">Pictures</option>
          <option value="Toys">Toys</option>
          <option value="Flowers">Flowers</option>
          <option value="Other">Other</option>
        </Form.Select>

        <Form.Group>
          <div className='d-grid gap-2 mb-5'>
            <Button variant='secondary' onClick={ShowItemForm}>Add items fields</Button>
            {
              show && (
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control placeholder='Field name' value={field} onChange={e => setField(e.target.value)}/>
                    </Col>
                    <Col >
                    <Form.Select className='mb-4' value={type} onChange={changeType}>
                      <option disabled>Type</option>
                      <option value="1">Number</option>
                      <option value="2">String</option>
                      <option value="3">Text</option>
                      <option value="4">Boolean</option>
                      <option value="5">Date</option>
                    </Form.Select>
                    </Col>
                    <Col>
                      <Button variant='secondary' type='submit'>Add</Button>
                    </Col>
                  </Row>
                </Form.Group>
              )
            }
          </div>
          
        </Form.Group>


        <Button className='m-2' variant='outline-dark' type='submit' onClick={onSubmit}>Create</Button>
        
        <Link to='/'>
        <Button variant='dark'>Cancel</Button>
        </Link>
        

      </Form>
    </Container>
    
  )
}

export default Create