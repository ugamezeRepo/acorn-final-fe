import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

const ChatBar = ({onSend}) =>  {
  const [message, setMessage] = useState('');

  return(
    <div className="chatBar" style={{ position: 'fixed', bottom: '0'}}>
      <input type="text" 
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        placeholder="#채널에 메시지 보내기" />
      <button onClick={() => {
        onSend({message, author: '더미유저',  sendDate: '오늘' });
        setMessage('');
      }}>Add</button>
    </div>
  )
 }

ChatBar.propTypes = {
  onSend: PropTypes.func
}

export default ChatBar;