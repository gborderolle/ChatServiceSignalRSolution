import React, { useState } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom }) => {
  const [username, setUsername] = useState('');
  const [chatroom, setChatroom] = useState('');

  return (
    <Card className='my-5 mx-auto shadow' style={{ maxWidth: '500px' }}>
      <Card.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            joinChatRoom(username, chatroom);
          }}
        >
          <Row className='mb-3 px-3'>
            <Col sm='12'>
              <Form.Group controlId='formUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3 px-3'>
            <Col sm='12'>
              <Form.Group controlId='formChatroom'>
                <Form.Label>Chatroom</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter chatroom'
                  value={chatroom}
                  onChange={(e) => setChatroom(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className='d-grid gap-2'>
            <Button variant='primary' type='submit' size='lg'>
              Join Chatroom
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default WaitingRoom;
