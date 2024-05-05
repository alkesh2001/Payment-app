import React, { useState } from 'react'
import {Menu} from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Navbar() {
 
  const navigate = useNavigate();

  const [show , setShow] = useState(false);
  
  const showBar = () =>{
    setShow(!show)
  }

  return (
       
   
    <div className='flex rounded-lg justify-between px-5 py-3 bg-slate-800 text-white'>
              <div className='font-medium'>
                welcome to payment app
              </div>
              <div className='flex gap-2'>
                <div className='font-medium'>
                   user
                </div>
                <div className='relative'>
                    <Menu onClick={showBar}/>
                    <div className={`${show ? "" : "hidden"} bg-gray-300 rounded-lg px-5 py-2 pb-5  text-black absolute top-8 right-0`}>
                      <div className='py-2'> 
                        user info
                      </div>
                      <span className='bg-black text-white px-3 py-1 rounded-lg cursor-pointer' 
                            onClick={()=>{
                               axios.post('http://localhost:8000/api/v1/users/logout' ,{}, {
                                  
                                headers : {
                                  Authorization : "Bearer" + localStorage.getItem("loginToken" || "signUptoken")
                            
                                }
                               }).then(()=> navigate("/"))
                              
                            }}
                      >
                        logOut
                      </span>
                    </div>
                </div>
              </div>
    </div>
  )
}

export default Navbar
