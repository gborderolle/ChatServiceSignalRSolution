import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import WaitingRoom from './WaitingRoom'; // Import the 'WaitingRoom' component
import ChatRoom from './components/ChatRoom';

function App() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = HubConnectionBuilder()
        .withUrl('https://localhost:5230/chat')
        .configureLogging(LogLevel.Information)
        .build();

      connection.on('JoinSpecificChatRoom', (username, message) => {
        console.log(username + ' ' + message);
      });

      connection.on('ReceiveMessage', (username, message) => {
        setMessages((messages) => [...messages, { username, message }]);
      });

      await connection.start();
      await connection.invoke('JoinChatRoom', { username, chatroom });

      setConnection(connection);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke('SendMessage', message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row class='px-5 my-5'>
            <Col sm='12'>
              <h1 class='text-center'>Welcome to React Bootstrap</h1>
            </Col>
          </Row>
          {!connection ? (
            <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
          ) : (
            <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
