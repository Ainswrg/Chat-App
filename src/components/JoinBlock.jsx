import React from "react";
import axios from "axios";

const JoinBlock = ({ onLogin }) => {
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Invalid data");
    }
    const obj = {
      roomId,
      userName,
    };
    setLoading(true);
    await axios.post("/rooms", obj);
    onLogin(obj);
  };
  return (
    <div className='join-block'>
      <input
        type='text'
        placeholder='Room ID'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type='text'
        placeholder='Your name'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        disabled={isLoading}
        onClick={onEnter}
        className='btn btn-success'
      >
        {isLoading ? "LOGIN..." : "ENTER"}
      </button>
    </div>
  );
};

export default JoinBlock;
