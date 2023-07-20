import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import axios from '../axios.js'
import { fetchCollections } from '../redux/slices/collections.js'

const Home = () => {
  const dispatch = useDispatch()
  const {collections, tags} = useSelector(state => state.collections)

  const isCollectionsLoading = collections.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchCollections())
  }, [])

  console.log(collections)


  return (
  <>
  <Container>
    <Row xs={1} md={3} className="g-4">
      {(isCollectionsLoading ? [...Array(6)] : collections.items).map(( obj, index) => 
      isCollectionsLoading ? (
        <Col key={index}>
          <Card key={index} isLoading={true}></Card>
        </Col>
      ) : (
        <Col key={index}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>

    

  </>
   
   )
}
 
export default Home