import { useEffect } from "react"
import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/login/login"
import NotifyCard from "./components/notification/notify"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import useUserStore from "./lib/useStore"
import "./index.css"
import useChatStore from "./lib/useChat"
const App = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore()
  const { chatId } = useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    });

    return () => {
      unSub()
    }
  }, [fetchUserInfo])
  const user = false


  // if (isLoading) return <div className="Loading">Loading...</div>
  return (
    <div className='container'>
      {currentUser ?
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Details />}
        </>
        : <Login />}

      <NotifyCard />
    </div>
  )
}

export default App