import React, { useEffect } from 'react'
import { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify'
import { auth } from '../../lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { db } from '../../lib/firebase'
import { setDoc, doc } from 'firebase/firestore'
import upload from '../../lib/upload'

const Login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })
    const [loading, setLoading] = useState(false)
    const handleImage = (e) => {
        if (e.target.files[0]) {  
            setAvatar({
                file: e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const {  email, password } = Object.fromEntries(formData)
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            console.log("LOGGED", res)
        } catch (error) {
            console.log("err", error)
             toast.error(`${error}`)

            
        } finally {
            setLoading(false)
        }
        toast.success("Signed in")

    }



    const handleRegister = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        
        const { username, email, password } = Object.fromEntries(formData)
        try {
            setLoading(true)
            const res = await createUserWithEmailAndPassword(auth, email, password)    
            
            const imgUrl = await upload(avatar.file)
            console.log("image", imgUrl)
        
            await setDoc(doc(db, "users", res?.user?.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res?.user?.uid,
                blocked:[]
            })
            await setDoc(doc(db, "userchats", res?.user?.uid), {
                chats:[]
            })
            
            toast.success("Account created! you can now login")
            
        } catch (error) {
            console.log("Errr", error?.message)
            // toast.error(`${Error.toString()}`)
            
        } finally {
            setLoading(false)
            
        }

    }    



        return (
            <div className="login">
                <div className="item">
                    <h2>Welcome Back</h2>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder='Email' name='email' />
                        <input type="password" placeholder='Password' name='password' />
                        <button>Sign In</button>      
                    </form>
                </div>
                <div className="separeter"/>

                
                <div className="item">
                <h2>Create an account</h2>
                    <form onSubmit={handleRegister}>
                        <label htmlFor='file'>
                            <img src={avatar?.url || "./avatar.png"} alt="pp" />Upload an image</label>
                        <input style={{display:"none"}} type="file" id='file' onChange={handleImage}/>
                        <input type="text" placeholder='Username' name='username' />
                        <input type="text" placeholder='Email' name='email' />
                        <input type="password" placeholder='Password' name='password' />
                        <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>      
                    </form>             
                </div>
            </div>
        )
}

export default Login