import React from 'react'
import "./userinfo.css"
const UserInfo = () =>  {
  return (
      <div className='userinfo'>
          <div className="user">
              <img src="./avatar.png" alt="sd" />
              <h2>Jhon Doe</h2>
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