import { useEffect } from "react"
import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/login/login"
import NotifyCard from "./components/notification/notify"
import { app } from "./lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import useUserStore from "./lib/useStore"
const App = () => {

  const {currentUser,  isLoading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const subb = onAuthStateChanged(auth, (user) => {
      console.log("user", user.uid)
       
    });
    
    return () => {
      console.log("SSSSSUUBBBB", subb())
    }
  },[])

  const user = false
  return (
    <div className='container'>
      {user ? 
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