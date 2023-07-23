import React from "react"
import { useParams } from 'react-router-dom'
import axios from '../axios.js'

import { Container, Button } from "react-bootstrap"

export const CollectionPage = () => {
  const [data, setData] = React.useState()
  const { id } = useParams('')

  React.useEffect(() =>{
    axios
      .get(`/collections/${id}`)
      .then((res) => {
        setData(res.data)
    }).catch(err => {
      console.warn(err)
      alert(err)
    })
  }, [])


  return (
    <>
      <Container className="m-4 d-flex flex-column justify-content-center align-items-center">
        <img style={{width: '18rem'}} src="https://www.nypl.org/sites/default/files/pd_banner_magnified_3.png" alt="collection image" />
        <h2></h2>
        <h3>Description</h3>
        <Button variant="outline-secondary" style={{borderRadius: '30px'}}>Topic</Button>

      </Container>



 
    </>
  )
}