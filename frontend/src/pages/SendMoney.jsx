import React, { useState } from 'react'
import { Botton, Input } from '../component'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

function SendMoney() {

  
  const [SearchParams] = useSearchParams()

  const id = SearchParams.get("id") ; 
  const name = SearchParams.get("name")

  const [amount , setAmount] = useState();
  
  const navigate = useNavigate()

  console.log(id)
  console.log(name)

  return (
    <div className='rounded-lg bg-white w-96 h-1/3'>
      <div className='py-7'>
         <div className='flex justify-center py-2 font-medium text-lg  text-green-500'>
           Send Money 
         </div>
         <div className='font-medium text-lg flex items-center py-2 gap-3 justify-center'>
            <div className='bg-gray-400 h-10 w-10 rounded-full justify-center items-center flex pb-1 text-lg font-medium text-white'>
              {name[0]}
            </div>
              {name}
         </div>
         <div className='py-3'>
            <div className='font-medium text-md px-10'>
                Amount  
                <span className='px-2'>
                  
                </span>
            </div>

            <div className='w-full ps-10 mt-1'>
                <Input onChange={(e)=> setAmount(e.target.value)} className="border-black border rounded-lg w-4/5 " type={'number'}/>
            </div>
         </div>
         <div className='flex justify-center py-3 w-full' 
              onClick={ async ()=>{
                      await axios.post('http://localhost:8000/api/v1/account/transfar',
                      {
                        to : id ,
                        amount : amount
                      },
                      {
                        headers: {
                          Authorization : "Bearer" + localStorage.getItem("loginToken" || "signUptoken")
                        }
                      }
                      ) ;
                      navigate('/home')
                   }
                 }
         >
            <Botton value={'inital transfer'} className="rounded-lg font-medium text-md w-full"/>
         </div>
      </div>
    </div>
  )
}

export default SendMoney
