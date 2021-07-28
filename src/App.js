import React from "react";
import Chat from "./components/Chat";
import JoinBlock from "./components/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });

    socket.emit("ROOM:JOIN", obj);
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  }

  React.useEffect(() => {
    socket.on('ROOM:JOINED', setUsers);
    socket.on('ROOM:SET_USERS', setUsers, []);
  },[]);


  window.socket = socket;

  return (
    <div className='wrapper'>
      {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state}/>}
    </div>
  );
}

export default App;
