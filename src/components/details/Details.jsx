import React, { useEffect, useState } from 'react'
import "./details.css"
import { signOut } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import useUserStore from '../../lib/useStore'
import useChatStore from '../../lib/useChat'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
const Details = () => {
  const { currentUser } = useUserStore()
  const { changeBlock, user, isRecieverBlocked, isCurrentUserBlocked, chatId } = useChatStore()
  const [chats, setChats] = useState()

  // console.log(currentUser)
  const handleLogout = () => {
    auth.signOut()
    window.location.reload()
  }
  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id)
    try {
      await updateDoc(userDocRef, {
        blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)

      });
      changeBlock()

    } catch (error) {

    }
  }
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data())

    })

    return () => {
      unSub()
    }
  }, [chatId])

  const filterImages = chats?.messages.filter(i => i.img)




  return (
    <div className='details'>
      <div className="user">
        <img src={user?.avatar ? user.avatar : "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">

          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />

          </div>
          <div className="photos">
            {filterImages?.map((i, index) => {
              return (

                <div className="photoItem">
                  <div className="photoDetails">

                    <img src={i?.img} alt="" />
                    <span>img{index + 1}</span>
                  </div>
                  <img className='icon' src="./download.png" alt='' />
                </div>
              )
            })}
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>{isCurrentUserBlocked ? "You are Blocked " : isRecieverBlocked ? "User Blocked" : "Block user"}</button>
        <button className='logout' onClick={handleLogout}>Logout</button>

      </div>
    </div>
  )
}

export default Details