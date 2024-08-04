import React, { useEffect, useState } from 'react'
import "./chat.css"
import { useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import useChatStore from '../../lib/useChat'
import useUserStore from '../../lib/useStore'

const Chat = () => {
  const [isOpen, setiOpen] = useState()
  const [chats, setChats] = useState(false)
  const [text, setText] = useState("")
  const { chatId } = useChatStore()
  const { currentUser } = useUserStore()


  const HandleEmoji = (e) => {
    setText((prev) => prev + e?.emoji)
    setiOpen(false)
  }

  const endRef = useRef(null)

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [endRef])


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data())
      console.log("chastsss", res.data())
    })

    return () => {
      unSub()
    }
  }, [chatId])

  const handleSend = async () => {

    if (text === "") return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          senderId: currentUser?.id,
          text,
          createdAt: new Date()

        })
      })

      const userChatRef = doc(db, "userchats", currentUser?.id)
      const userSnapShot = await getDoc(userChatRef)

      if (userSnapShot?.exists()) {
        const userChatData = userSnapShot.data()
        const chatIndex = userChatData.filter(c => c.chatId === chatId)
        userChatData[chatIndex].lastMessage = text;
        userChatData[chatIndex].updatedAt = Date.now();

        await updateDoc(userChatRef, {
          chats: userChatData.chats,
        })



      }

    } catch (error) {
      console.log("errr", error)
    }

  }

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
        {chats?.messages?.map((message) => {
          return (

            <div className="message own" key={message.createdAt}>
              <div className="texts">
                {message?.image && <img src="https://wallpapers.com/images/featured/just-do-it-vhkb17xnjl1lhd32.jpg" alt="" />}
                {/* <p>{message?.text}</p> */}
                {/* <span>{message?.createdAt}</span> */}
              </div>
            </div>
          )
        })}
        {/* <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus nisi voluptate assumenda, repudiandae quam perspiciatis ducimus ad eius, facere consequatur voluptas omnis! Corporis temporibus laudantium dignissimos praesentium, laborum deserunt deleniti!</p>
            <span>1 min ago</span>
          </div>
        </div> */}
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
        <button className='sendButton' onClick={() => handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat