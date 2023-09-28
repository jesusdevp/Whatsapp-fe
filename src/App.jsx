import SocketContext from "./context/SocketContext"
import { Navigation } from "./routes/Navigation"
import { io } from 'socket.io-client'


const socket = io('http://localhost:8000')

function App() {

  return (
    <div className="dark" >
      <SocketContext.Provider value={ socket } >
        <Navigation />
      </SocketContext.Provider>
    </div>
  )
}

export default App
