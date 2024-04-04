import React, { useState } from 'react';
import { CButton, CFormInput, CFormLabel, CCol, CForm } from '@coreui/react';

const WaitingRoom = ({ joinChatRoom }) => {
  const [username, setUsername] = useState('');
  const [chatroom, setChatroom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    joinChatRoom(username, chatroom);
  };

  return (
    <CForm className='row g-3' onSubmit={handleSubmit}>
      <CCol xs='auto'>
        <CFormLabel htmlFor='staticEmail2' className='visually-hidden'>
          Username
        </CFormLabel>
        <CFormInput type='text' id='staticEmail2' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
      </CCol>
      <CCol xs='auto'>
        <CFormLabel htmlFor='inputPassword2' className='visually-hidden'>
          Chatroom
        </CFormLabel>
        <CFormInput type='text' id='inputPassword2' placeholder='Chatroom' onChange={(e) => setChatroom(e.target.value)} />
      </CCol>
      <CCol xs='auto'>
        <CButton color='primary' type='submit' className='mb-3' size='lg'>
          Join
        </CButton>
      </CCol>
    </CForm>
  );
};

export default WaitingRoom;
