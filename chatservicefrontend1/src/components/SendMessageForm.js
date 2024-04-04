import React, { useState } from 'react';
import { CButton, CFormInput, CFormLabel, CCol, CForm } from '@coreui/react';

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <CForm className='row g-3' onSubmit={handleSubmit}>
      <CCol xs='auto'>
        <CFormInput
          type='text'
          id='inputPassword2'
          placeholder='Enter message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </CCol>
      <CCol xs='auto'>
        <CButton color='primary' type='submit' className='mb-3' size='lg'>
          Join
        </CButton>
      </CCol>
    </CForm>
  );
};

export default SendMessageForm;
