import React from 'react'
import "./details.css"

const Details = () =>  {
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
            {/* {[1, 2, 3, 4].map((i) => {
              return (
                
            <div className="photoItem">
              <div className="photoDetails">

              <img src="https://wallpapers.com/images/featured/just-do-it-vhkb17xnjl1lhd32.jpg" alt="" />
              <span>photos_2023.jpg</span>
              </div>
            </div>
              )
            })} */}
            <img src="./download.png" alt='' />
          </div>
        </div>
        
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div> 
        <button>Block User</button>
      </div>
    </div>
  )
}

export default Details