import { useEffect } from "react"
import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/login/login"
import NotifyCard from "./components/notification/notify"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import useUserStore from "./lib/useStore"
const App = () => {

  const {currentUser,  isLoading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const subb = onAuthStateChanged(auth, (user) => {
      console.log("user", user)
      fetchUserInfo(user.uid) 
    });
    
    return () => {
      console.log("SSSSSUUBBBB", subb())
    }
  },[fetchUserInfo])
  const user = false

  console.log("CURERERE", currentUser)

  if(isLoading) return <div className="Load">Loading...</div>
  return (
    <div className='container'>
      {currentUser ? 
        <>
      <List />
      <Chat />
      <Details/>
        </>
        : <Login />}
      
      <NotifyCard/>
    </div>
  )
}

export default App