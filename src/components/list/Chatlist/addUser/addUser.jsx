import React from 'react'
import "./addUser.css"
import { useState, useEffect } from 'react'
import { getDoc, collection, where, query, getDocs, setDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { toast } from 'react-toastify'

const AddUser = () => {
    const [user, setuser] = useState(null)
    const [isLoading, setisLoading] = useState(false)


    //Returns a user with the same username of the search inpur and store it in our state
    const handleSearch = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const username = form.get("username")
        setisLoading(true)
        try {
            const userCollection = collection(db, "users")
            const q = query(userCollection, where("username", "==", username))

            const querySnapshot = await getDocs(q)

            if (!querySnapshot?.empty) {
                setuser(querySnapshot.docs[0].data())
                console.log("user", user)
                console.log("OOOOOOO", querySnapshot.docs[0].data())

            } else {
                console.log("erer")
            }


        } catch (error) {
            console.log("Err", error)
        } finally {
            setisLoading(false)
        }

    }


    const HandleAdd = async () => {

        const userChatRef = collection(db, "chats")
        const userRef = collection(db, "userchats")

        try {
            const newChatRef = doc(userChatRef)
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            })
            console.log("Chatid 22s", newChatRef?.id)
            toast.success(`${user?.username} Succesfully Added`)
            await updateDoc(doc(userChatRef, user?.id), {
                chatId: newChatRef?.id
            })

        } catch (error) {
            console.log("err", error)

        }
    }
    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Username' name='username' />
                <button>{isLoading ? "loading" : "Search"}</button>
            </form>
            <div className="user">
                {user &&
                    <>
                        <div className="detail">
                            <img src={user?.avatar} alt="" />
                            <span>{user?.username}</span>
                        </div>
                        <button onClick={HandleAdd}>Add User</button>
                    </>
                }

            </div>

        </div>
    )
}

export default AddUser