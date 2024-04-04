import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';

import WaitingRoom from './components/WaitingRoom';
import ChatRoom from './components/ChatRoom';

import './App.css';

function AppNew() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const establishConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5230/chat')
        .configureLogging(LogLevel.Information)
        .build();

      newConnection.on('JoinSpecificChatRoom', (username, message) => {
        console.log(username + ' ' + message);
      });

      newConnection.on('ReceiveSpecificMessage', (username, message) => {
        setMessages((messages) => [...messages, { username, message }]);
      });

      newConnection.onclose(async () => {
        console.log('Connection lost, attempting to reconnect...');
        await startConnection(newConnection);
      });

      await startConnection(newConnection);
    };

    establishConnection();
  }, []);

  const startConnection = async (newConnection) => {
    try {
      await newConnection.start();
      console.log('Connected!');
      setConnection(newConnection);
    } catch (error) {
      console.error('Connection failed: ', error);
      setTimeout(() => startConnection(newConnection), 5000); // Intentar reconectar después de un retraso
    }
  };

  const joinChatRoom = async (username, chatroom) => {
    try {
      if (connection && connection.state === HubConnectionState.Connected) {
        await connection.invoke('JoinSpecificChatRoom', { username, chatroom });
      }
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

export default AppNew;
