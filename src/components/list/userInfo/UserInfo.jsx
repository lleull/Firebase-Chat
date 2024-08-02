import React from 'react'
import "./userinfo.css"
import useUserStore from '../../../lib/useStore'
const UserInfo = () => {
  const {currentUser} = useUserStore()
  console.log(currentUser)
  return (
      <div className='userinfo'>
          <div className="user">
              <img src={currentUser?.avatar} alt="sd" />
              <h2>{currentUser?.username}</h2>
          </div>
          <div className="icons">
              <img src="./more.png" alt="s" />
              <img src="./video.png" alt="s" />
              <img src="./edit.png" alt="s" />

          </div>
    </div>
  )
}

export default UserInfo