import React from 'react';
import { CFormLabel, CCol, CForm } from '@coreui/react';

const MessageContainer = ({ messages }) => {
  return (
    <CForm className='row g-3'>
      <CCol xs='auto'>
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              {message.message} - {message.username}
            </p>
          </div>
        ))}
      </CCol>
    </CForm>
  );
};
export default MessageContainer;
