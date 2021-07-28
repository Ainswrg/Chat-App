import React from "react";
import JoinBlock from "./components/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
  });

  const onLogin = (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });

    socket.emit("ROOM:JOIN", obj);
  };

  React.useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      console.log("new user", users);
    });
  },[]);


  window.socket = socket;

  return (
    <div className='wrapper'>
      {!state.joined && <JoinBlock onLogin={onLogin} />}
    </div>
  );
}

export default App;
