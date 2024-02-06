import PropTypes from 'prop-types';

const ChatMessage = ({author, message, sendDate}) => {
  return (
    <div style={{ display: 'flex'}}>
      <div>
        <img width={48} height={32} src='https://1000logos.net/wp-content/uploads/2017/08/Chrome-Logo.png'/>
      </div>
      <div>
        <div style={{ display: 'flex'}}>
          <div style={{color: 'blue'}}>{author}</div>
          <div>{sendDate}</div>
        </div>
        <div>
          {message}
        </div>
      </div>
    </div>
  )
}

ChatMessage.propTypes = {
  author: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired, 
  sendDate: PropTypes.string.isRequired,
};

export default ChatMessage;