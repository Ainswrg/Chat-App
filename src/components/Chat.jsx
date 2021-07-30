import React from "react";
import socket from "../socket";

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = React.useState("");
  const messagesRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue("");
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='chat'>
      <div className='chat-users'>
        Room: <b>{roomId}</b>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className='chat-messages'>
        <div className='messages'>
          {messages.map((message, index) => (
            <div key={message + index} className={message.userName === userName? 'message my' : 'message'}>
              <p>{message.text}</p>
              <div>
                <div className="user-img">{message.userName}</div>
              </div>
            </div>
          ))}
          <div ref={messagesRef} />
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className='form-control'
            rows='3'
          ></textarea>
          <button
            onClick={onSendMessage}
            type='button'
            className='btn btn-primary button'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
