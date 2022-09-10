import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
const Contact = (props) => {

    // console.log(props);

    const deleteContactHandler = (id) => {
        props.remove(id);
    }

    return (
       props.search.map((contact, index) => {
        return (
            <Col className='my-3' key={contact.id}>
            <Card bg='secondary' style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>ID: {contact.id}</Card.Title>
            <Card.Text className='fs-2'> {contact.contact.name}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>Phone: {contact.contact.phone}</ListGroup.Item>
            <ListGroup.Item>email: {contact.contact.email}</ListGroup.Item>
            <ListGroup.Item>
            <Button 
              className="px-3" 
              variant="danger" 
              onClick={() => deleteContactHandler(contact.id)}>
                Delete
            </Button>
            </ListGroup.Item>
            </ListGroup>
            </Card>
            </Col>
        )
       }) 
  )
}

export default Contact