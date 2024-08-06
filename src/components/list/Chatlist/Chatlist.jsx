import React, { Fragment, useEffect } from 'react'
import "./chatlist.css"
import { useState } from 'react'
import AddUser from './addUser/addUser'
import useUserStore from '../../../lib/useStore'
import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../../lib/firebase'
import useChatStore from '../../../lib/useChat'
const Chatlist = () => {
  const [addMode, setaddMode] = useState(false)
  const [chats, setChats] = useState()
  const { currentUser } = useUserStore()
  const { changeChat, user, chatId } = useChatStore()
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser?.id), async (res) => {
      const items = res.data().chats
      // console.log("user", items)

      const Promises = items?.map(async (item) => {
        const userDocRef = doc(db, "users", item?.receiverId)
        const userDocSnap = await getDoc(userDocRef)
        const user = userDocSnap.data()

        return { ...item, user }
      })

      const chatData = await Promise.all(Promises)
      setChats(chatData.sort((a, b) => a?.updatedAt - b?.updatedAt))
    });

    return () => {
      unSub()
    }
  }, [currentUser?.id])
  // console.log("USUSUSUChat", chats)

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item
      return rest;
    })

    const chatIndex = userChats.findIndex((i) => i.chatId === chat.chatId)

    console.log("chatIndex", chatIndex)
    userChats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userChats
      })
      await changeChat(chat?.chatId, chat?.user)

    } catch (error) {
      console.log("err", error)

    }
  }


  return (
    <div className='chatlist'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="s" />
          <input type="text" placeholder='Search' />
        </div>
        <img onClick={() => setaddMode(!addMode)} src={!addMode ? "./plus.png " : "./minus.png"} alt="s" className='add' />

      </div>

      {chats?.map((chat) => {
        return (
          <Fragment>
            <div onClick={() => handleSelect(chat)} className="item" style={{
              backgroundColor: chat?.isSeen ? "transparent" : "blue"
            }}>
              <img src={chat.user?.avatar || "./avatar.png"} alt="s" />
              <div className="texts">
                <span>{chat?.user.username}</span>
                <p>{chat.lastMessage}</p>
              </div>
            </div>

          </Fragment>
        )
      })}
      {addMode ?

        <div className='overlay'>
          <AddUser setaddMode={setaddMode} />
        </div>

        : ""}
    </div >
  )
}

export default Chatlist