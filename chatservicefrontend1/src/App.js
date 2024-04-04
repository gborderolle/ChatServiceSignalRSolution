import React, { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import WaitingRoom from './components/WaitingRoom';
import ChatRoom from './components/ChatRoom';

import './App.css';

function App() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5230/chat')
        .configureLogging(LogLevel.Information)
        .build();

      connection.on('JoinSpecificChatRoom', (username, message) => {
        console.log(username + ' ' + message);
      });

      connection.on('ReceiveSpecificMessage', (username, message) => {
        setMessages((messages) => [...messages, { username, message }]);
      });

      await connection.start();
      await connection.invoke('JoinSpecificChatRoom', { username, chatroom });

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
    <div className='App'>
      <header className='App-header'>
        <h1>Chat Room</h1>
        {!connection ? (
          <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
        ) : (
          <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
        )}
      </header>
    </div>
  );
}

export default App;
