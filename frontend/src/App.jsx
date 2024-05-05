import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import SendMoney from "./pages/SendMoney"
import { Route , Routes } from "react-router-dom"

function App() {

  return (
    <div className="bg-gray-300  flex justify-center items-center w-screen h-screen">
        <div className="">
          <Routes >
             <Route path="/" element={ <Login/>}/>  
             <Route path="/signup" element={ <SignUp/>}/>
             <Route path="/home" element={<Home/>}/>
             <Route path="/sendMoney" element={<SendMoney/>}/>
          </Routes>
        </div> 
    </div>   
  ) 
}

export default App
