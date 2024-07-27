import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/login/login"
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
    : <Login/>}
    </div>
  )
}

export default App