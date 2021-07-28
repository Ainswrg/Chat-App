import React from 'react'


const Chat = ({users, messages}) => {

  const [messageValue, setMessageValue] = React.useState('');

  return (
    <div className="chat">
      <div className="chat-users">
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => <li key={name + index}>{name}</li>)}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
          <div className="message">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, dolores necessitatibus? </p>
            <div>
              <span>Test User</span>
            </div>
          </div>
          <div className="message">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, dolores necessitatibus? </p>
            <div>
              <span>Test User</span>
            </div>
          </div>
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
            <button type="button" className="btn btn-primary">
              Send
            </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
