import React from 'react';
import {Card, Button, Row, Col, Container} from 'react-bootstrap'

export const Collection = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {


  const onClickRemove = () => {};

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageUrl} alt={title}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer>
          <div>Created by: {user}</div>
        </Card.Footer>
      </Card>
    </>
  )
}