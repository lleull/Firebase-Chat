import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/login/login"
import NotifyCard from "./components/notification/notify"
const App = () => {

  const user = true
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