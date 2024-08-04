import React from 'react'
import "./details.css"
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import useUserStore from '../../lib/useStore'
import useChatStore from '../../lib/useChat'
const Details = () => {
  const { currentUser } = useUserStore()
  const { changeBlock } = useChatStore
  // console.log(currentUser)
  const handleLogout = () => {
    auth.signOut()
    window.location.reload()
  }
  return (
    <div className='details'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Leul Rom</h2>
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
            {[1, 2, 3, 4].map((i) => {
              return (

                <div className="photoItem">
                  <div className="photoDetails">

                    <img src="https://wallpapers.com/images/featured/just-do-it-vhkb17xnjl1lhd32.jpg" alt="" />
                    <span>photos_2023.jpg</span>
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
        <button>Block User</button>
        <button className='logout' onClick={handleLogout}>Logout</button>

      </div>
    </div>
  )
}

export default Details