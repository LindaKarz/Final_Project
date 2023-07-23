import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import { fetchCollections } from '../redux/slices/collections.js'
import { Link } from 'react-router-dom'


const Home = () => {
  const dispatch = useDispatch()
  const { collections } = useSelector(state => state.collections)

  const isCollectionsLoading = collections.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchCollections())
  }, [])

  console.log(collections)


  return (
  <>
  <Container className='mt-5'>
    <Row xs={1} md={3} className="g-4">
      {(isCollectionsLoading ? [...Array(6)] : collections.items).map(( obj, index) => 
      isCollectionsLoading ? (
        <Col key={index}>
          <Card key={index} isLoading={true}></Card>
        </Col>
      ) : (
        <Col key={index}>
          <Card style={{ width: '18rem' }}>
            <Link to={`/collections/${obj._id}`}>
              <Card.Img variant="top" src={obj.image} />
              <Card.Body>
                <Card.Title>{obj.title}</Card.Title>
                <Card.Text>
                  {obj.description}
                </Card.Text>
              </Card.Body>
            </Link>
            <Card.Footer>
              <Button variant="outline-secondary" style={{borderRadius: '30px'}} size='sm'>{obj.topic}</Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>

    

  </>
   
   )
}
 
export default Home