import React, { useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react'

const Chat = () => {
  const [isOpen, setiOpen] = useState(false)
  const [text, setText] = useState("")

  const HandleEmoji = (e) => {
   setText((prev) => prev + e?.emoji)
   setiOpen(false)
  }
    return (
    <div className='chat'>
        <div className="top">
          <div className="user">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <span>Leul Moke </span>
              <p>Tell me ipsum dolor sit amet cribus.</p>
            </div>
          </div>
          <div className="icons">
            <img src="./phone.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./info.png" alt="" />

          </div>

        </div>
        <div className="center"></div>
        <div className="bottom">
          <div className="icons">
          <img src="./img.png" alt="" />
            <img src="./camera.png" alt="" />
            <img src="./mic.png" alt="" />
          </div>
          <input onChange={(e) => setText(e?.target?.value)} value={text} type="text" placeholder='Type a message...' />
          <div className="emoji">
            <img src="./emoji.png" alt="" onClick={() => setiOpen(prev => !prev)} />
            <div className="picket">

            <EmojiPicker open={isOpen} onEmojiClick={HandleEmoji} />
            </div>
          </div>
          <button className='sendButton'>Send</button>
        </div>
    </div>
  )
}

export default Chat