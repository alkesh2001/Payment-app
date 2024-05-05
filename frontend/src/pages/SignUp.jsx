import React, { useState } from 'react'
import { Input , Botton } from '../component'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'

function SignUp() {
  
    const [username , setUsername] = useState('')
    const [fullname , setFullname] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const navigate = useNavigate()


    const signUpUser = async ()=>{
         try {
                const response = await axios.post('http://localhost:8000/api/v1/users/register' , {username , email ,fullname , password})
                localStorage.setItem("signUptoken" , response.data.accessToken)
                
                if(response.status === 200){
                    const currentUser = await axios.get('http://localhost:8000/api/v1/users/current-User' , {
                        headers : {
                            Authorization : "Bearer" + localStorage.getItem("signUptoken")
                        }
                    })
                    console.log(currentUser)
                 }

                navigate('/home')
                console.log(response.data)
            } catch (error) {  
                console.log(error , "error when user signup")       
         }
                
    } 

  return (
    <div className='py-4 rounded-lg bg-white w-96 h-1/3 '>
        <div className='text-lg flex justify-center font-medium'> 
            Welcome to Payment App
        </div>
        <div className='text-lg font-medium flex justify-center pt-4'>
           Create Account
        </div>
        <div className='grid justify-center gap-4 w-full pt-4' >
                <div>
                    <Input 
                    onChange={(e)=> setUsername(e.target.value)}
                    placeholder='username'
                    className="border-black border font-medium py-2 rounded-md text-black"
                    />
                </div>
                <div>
                    <Input 
                    onChange={(e)=> setFullname(e.target.value)}
                    placeholder='fullname'
                    className="border-black border font-medium py-2 rounded-md text-black"
                    />
                </div>
                <div>
                    <Input 
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder='email'
                    type="email" 
                    className="border-black border py-2 font-medium rounded-md text-black" 
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
                    <Botton  value={"Sign Up"} onClick={signUpUser} className={"font-medium rounded-md"}/>
                </div>
        </div>
        <div className='flex justify-center gap-2'>
            <div className='font-medium '>
                 already Account
            </div>
            <div className='font-medium text-blue-400'>
             <Link to={'/'}>
                Login
             </Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp
