import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';

import WaitingRoom from './components/WaitingRoom';
import ChatRoom from './components/ChatRoom';

import './App.css';

function App() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl('http://localhost:5230/chat')
        .configureLogging(LogLevel.Information)
        .build();

      conn.on('JoinSpecificChatRoom', (username, message) => {
        console.log(username + ' ' + message);
      });

      conn.on('ReceiveSpecificMessage', (username, message) => {
        setMessages((messages) => [...messages, { username, message }]);
      });

      await conn.start();
      await conn.invoke('JoinSpecificChatRoom', { username, chatroom });

      setConnection(conn);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      if (connection && connection.state === HubConnectionState.Connected) {
        await connection.invoke('SendMessage', message);
      } else {
        console.error('Cannot send message, connection is not open.');
      }
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Chat Room</h1>
        {!connection || connection.state !== HubConnectionState.Connected ? (
          <WaitingRoom joinChatRoom={joinChatRoom} />
        ) : (
          <ChatRoom messages={messages} sendMessage={sendMessage} />
        )}
      </header>
    </div>
  );
}

export default App;
