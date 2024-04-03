import React, { useState } from 'react';
import { Form, Row, Col, Button, Card, InputGroup } from 'react-bootstrap';

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
    >
      <InputGroup className='mb-3'>
        <Form.Control
          type='text'
          placeholder='Enter message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type='submit' variant='primary' disabled={!message}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
