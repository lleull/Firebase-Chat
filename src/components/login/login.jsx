import React, { useEffect } from 'react'
import { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify'
const Login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })
    const handleImage = (e) => {
        if (e.target.files[0]) {
            
            setAvatar({
                file: e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
    }

    useEffect(() => {
        console.log("AVAVAV", avatar)
    },[avatar])

    const handleLogin = (e) => {
        e.preventDefault()
        toast.success("Signed in")

    }
  return (
      <div className="login">
          <div className="item">
              <h2>Welcome Back</h2>
              <form onSubmit={handleLogin}>
                  <input type="text" placeholder='Email' name='email' />
                  <input type="text" placeholder='Password' name='password' />
                  <button>Sign In</button>      
              </form>
          </div>
          <div className="separeter">
  
          </div>

          <div className="item">
          <h2>Create an account</h2>
              <form>
                  <label htmlFor='file'>
                      <img src={avatar?.url || "./avatar.png"} alt="pp" />Upload an image</label>
                  <input style={{display:"none"}} type="file" id='file' onChange={handleImage}/>
                  <input type="text" placeholder='Username' name='username' />
                  <input type="text" placeholder='Email' name='email' />
                  <input type="text" placeholder='Password' name='password' />
                  <button>Sign Up</button>      
              </form>
              
          </div>
    </div>
  )
}

export default Login