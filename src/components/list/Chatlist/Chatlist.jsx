import React from 'react'
import "./chatlist.css"
import { useState } from 'react'
const Chatlist = () => {
  const [addMode, setaddMode] = useState(false)
  return (
      <div className='chatlist'>
          <div className="search">
              <div className="searchBar">
                  <img src="./search.png" alt="s" />
                  <input type="text" placeholder='Search' />
              </div>
              <img onClick={(prev) => setaddMode(!prev)} src={!addMode ? "./plus.png " :"./minus.png"} alt="s" className='add' />

      </div>
    
     <div className="item">
        <img  src="./avatar.png" alt="s" />
        <div className="texts">
                <span>Leul Mekonnen</span>
                <p>Hello</p>
        </div>
      </div>    <div className="item">
        <img  src="./avatar.png" alt="s" />
        <div className="texts">
                <span>Leul Mekonnen</span>
                <p>Hello</p>
        </div>
      </div>    <div className="item">
        <img  src="./avatar.png" alt="s" />
        <div className="texts">
                <span>Leul Mekonnen</span>
                <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chatlist