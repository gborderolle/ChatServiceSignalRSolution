import React from 'react';
import { CFormLabel, CCol, CForm } from '@coreui/react';

import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

const ChatRoom = ({ messages, sendMessage }) => {
  return (
    <div className='row g-3'>
      <CCol xs='auto'>
        <CFormLabel htmlFor='staticEmail2' className='visually-hidden'>
          Messages
        </CFormLabel>
      </CCol>
      <CCol xs='auto'>
        <MessageContainer messages={messages} />
      </CCol>
      <CCol xs='auto'>
        <SendMessageForm sendMessage={sendMessage} />
      </CCol>
    </div>
  );
};

export default ChatRoom;
