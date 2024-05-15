import React, {useState } from 'react'
import { Botton, Input } from '../component'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { login as authlogin } from '../store/authSlice.js'
function Login() {

  
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const [data , setData] = useState(null)

    const dipatch = useDispatch()
  
   const navigate = useNavigate()
 

    const login = async () =>{
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login' , {email , password})
            console.log(response)
         
             localStorage.setItem("accessToken" , response.data.accessToken)

             if(response.status === 200){
                const currentUser = await axios.get('http://localhost:8000/api/v1/users/current-User' , {
                    headers : {
                        Authorization : "Bearer" + localStorage.getItem("accessToken")
                    }
                })
                console.log(currentUser)
                setData(currentUser)
                dipatch(authlogin(currentUser))
             }
            
             console.log(response.data)
   
            navigate('/home')
        } catch (error) {
            console.log(error , "error when user login")
        }
    }

    console.log(data , 'current data not add in state')

  return (
    <div className='pt-4 rounded-lg bg-white w-80 md:w-96 h-96'>
        <div className='text-lg flex justify-center font-medium'> 
            Welcome to Payment App
        </div>
        <div className='text-lg font-medium flex justify-center pt-4'>
            Login 
        </div>
        <div className='grid justify-center gap-5 w-full pt-4' >
            <div>
                <Input 
                 placeholder='username'
                 onChange={(e)=> setEmail(e.target.value)}
                 className="border-black border font-medium py-2 rounded-md text-black"
                />
            </div>
            <div>
                <Input 
                onChange={(e)=> setPassword(e.target.value)}
                 placeholder='password'
                 type="password" 
                 className="border-black border py-2 font-medium rounded-md text-black" 
                />
            </div>
            <div className='flex justify-center py-3'>
                <Botton  value={"SignIn"} onClick={login} className={"font-medium rounded-md"}/>
            </div>
        </div>
        <div className='flex justify-center pt-7 gap-2'>
            <div className='font-medium '>
                 create Account
            </div>
            <div className='font-medium text-blue-400'>
                <Link to={"/signup"}>
                    SignUp
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login
