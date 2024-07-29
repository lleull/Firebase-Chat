import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/login/login"
import NotifyCard from "./components/notification/notify"
import { app } from "./lib/firebase"
const App = () => {

  console.log(app)


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