import React from 'react';
import ReactDOM from 'react-dom/client';
import WaitingRoom from './components/WaitingRoom';

// Usa createRoot para montar tu aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WaitingRoom joinChatRoom={(username, chatroom) => {}} />
  </React.StrictMode>
);
