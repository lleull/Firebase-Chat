import React, { useEffect, useState } from 'react'
import "./chat.css"
import { useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const Chat = () => {
  const [isOpen, setiOpen] = useState()
  const [chats, setChats] = useState(false)


  const [text, setText] = useState("")

  const HandleEmoji = (e) => {
    setText((prev) => prev + e?.emoji)
    setiOpen(false)
  }

  const endRef = useRef(null)

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [endRef])


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", "D2Cz4EkA7iYqpGSafDRv"), (res) => {
      setChats(res.data())
    })

    return () => {
      unSub()
    }
  }, [])

  console.log("chats", chats)

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
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus nisi voluptate assumenda, repudiandae quam perspiciatis ducimus ad eius, facere consequatur voluptas omnis! Corporis temporibus laudantium dignissimos praesentium, laborum deserunt deleniti!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://wallpapers.com/images/featured/just-do-it-vhkb17xnjl1lhd32.jpg" alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus nisi voluptate assumenda, repudiandae quam perspiciatis ducimus ad eius, facere consequatur voluptas omnis! Corporis temporibus laudantium dignissimos praesentium, laborum deserunt deleniti!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus nisi voluptate assumenda, repudiandae quam perspiciatis ducimus ad eius, facere consequatur voluptas omnis! Corporis temporibus laudantium dignissimos praesentium, laborum deserunt deleniti!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own ">
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus nisi voluptate assumenda, repudiandae quam perspiciatis ducimus ad eius, facere consequatur voluptas omnis! Corporis temporibus laudantium dignissimos praesentium, laborum deserunt deleniti!</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div ref={endRef} />
      </div>
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