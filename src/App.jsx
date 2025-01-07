import Home from "./components/userside/pages/Home"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import UserRoute from "./routes/UserRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/*" element = {<UserRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
