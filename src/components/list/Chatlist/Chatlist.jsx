import React, { Fragment, useEffect } from 'react'
import "./chatlist.css"
import { useState } from 'react'
import AddUser from './addUser/addUser'
import useUserStore from '../../../lib/useStore'
import { doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../../lib/firebase'
const Chatlist = () => {
  const [addMode, setaddMode] = useState(false)
  const [chats, setChats] = useState(null)
  const { currentUser } = useUserStore()

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser?.id), async (res) => {
      const items = res.data().chats

      const Promises = items?.map(async (item) => {
        const userDocRef = doc(db, "users", item?.receiverId);
        const userDocSnap = await getDocs(userDocRef)

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
  console.log("USUSUSUChat", chats)


  return (
    <div className='chatlist'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="s" />
          <input type="text" placeholder='Search' />
        </div>
        <img onClick={() => setaddMode(!addMode)} src={!addMode ? "./plus.png " : "./minus.png"} alt="s" className='add' />

      </div>

      {chats?.map((user) => {
        return (
          <Fragment>
            <div className="item">
              <img src={user?.avatar || "./avatar.png"} alt="s" />
              <div className="texts">
                <span>{user.username}</span>
                <p>Hello</p>
              </div>
            </div>

          </Fragment>
        )
      })}
      {addMode ?

        <div className='overlay'>
          <AddUser />
        </div>

        : ""}
    </div >
  )
}

export default Chatlist