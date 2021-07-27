import React from 'react'
import socket from '../socket'

const JoinBlock = () => {
  return (
    <div className="join-block">
      <input type="text"placeholder="Room ID"/>
      <input type="text"placeholder="Your name"/>
      <button className="btn btn-success">Enter</button>
    </div>
  )
}

export default JoinBlock
