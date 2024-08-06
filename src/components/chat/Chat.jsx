import React, { useEffect, useState } from 'react'
import "./chat.css"
import { useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import useChatStore from '../../lib/useChat'
import useUserStore from '../../lib/useStore'
import upload from '../../lib/upload'
const Chat = () => {
  const [isOpen, setiOpen] = useState()
  const [chats, setChats] = useState(false)

  const [img, setImg] = useState({
    file: null,
    url: ""
  })

  const [text, setText] = useState("")
  const { chatId, user, isRecieverBlocked, isCurrentUserBlocked } = useChatStore()
  const { currentUser } = useUserStore()


  useEffect(() => {
    console.log("imgeeererer", img.url)
    console.log("Blocked", isRecieverBlocked)

  }, [isRecieverBlocked])




  const HandleEmoji = (e) => {
    setText((prev) => prev + e?.emoji)
    setiOpen(false)
  }

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const endRef = useRef(null)

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [endRef])


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data())

    })

    return () => {
      unSub()
    }
  }, [chatId])

  const handleSend = async () => {

    if (text === "" && img.url === "") return;


    console.log("imag", img.file)


    let imgUrl = null
    try {
      if (img.file) {
        console.log("imag", img.file)
        imgUrl = await upload(img.file)
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser?.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl })

        })
      })

      const userIDs = [currentUser?.id, user?.id];
      userIDs.forEach(async (id) => {


        const userChatRef = doc(db, "userchats", id)
        const userSnapShot = await getDoc(userChatRef)

        if (userSnapShot?.exists()) {
          const userChatData = userSnapShot.data()
          const chatIndex = userChatData.chats.findIndex(c => c.chatId === chatId)
          console.log("Chat index", chatIndex)

          if (chatIndex !== -1) {
            console.log('Chat data before update:', userChatData.chats[chatIndex]);

            userChatData.chats[chatIndex].isSeen = id === currentUser?.id ? true : false;

            userChatData.chats[chatIndex].lastMessage = text;
            userChatData.chats[chatIndex].updatedAt = Date.now();

            console.log('Chat data After update:', userChatData.chats[chatIndex]);


            await updateDoc(userChatRef, {
              chats: userChatData.chats,
            })


          }

        }
      })

      setImg({
        file: null,
        url: ""
      })

      setText("")


    } catch (error) {
      console.log("errr", error)
    }

  }




  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
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

            <div className={message?.senderId === currentUser?.id ? "message own" : "message"} key={message.createdAt}>
              <div className="texts">
                {message?.img && <img src={message?.img} alt="" />}
                <p>{message?.text !== "" && message?.text}</p>
                {/* <span>{message?.createdAt}</span> */}
              </div>
            </div>
          )
        })}
        {img.url &&
          <div className="message own">

            <div className="texts">
              <img src={img.url ? img?.url : ""} alt="" />

            </div>
          </div>
        }
        <div ref={endRef} />
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input type='file' id='file' style={{ display: "none" }} onChange={handleImage} />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input disabled={isRecieverBlocked || isCurrentUserBlocked} onChange={(e) => setText(e?.target?.value)} value={text} type="text" placeholder={isRecieverBlocked || isCurrentUserBlocked ? "You are blocked " : 'Type a message...'} />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setiOpen(prev => !prev)} />
          <div className="picket">

            <EmojiPicker open={isOpen} onEmojiClick={HandleEmoji} />
          </div>
        </div>
        <button disabled={isRecieverBlocked || isCurrentUserBlocked} type='submit' className='sendButton' onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  )
}

export default Chat