import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Balance() {

  const [data , setData] = useState()
  
  useEffect(()=>{
    const getBalance = async()=>{
      
      try {
          
        let tokenKey = "loginToken"
        
        const loginToken = localStorage.getItem("loginToken");
        if(!loginToken){
          tokenKey = "signUptoken"
        }
          // const Tokenkey  = localStorage.getItem("loginToken") ? "loginToken " : "signUptoken " ;

           const res = await axios.get('http://localhost:8000/api/v1/account/balance' ,{
              headers : {
                Authorization : `Bearer` + localStorage.getItem('loginToken')
          
              }
           })
           if(res){
            console.log(res)
            setData(res.data.balance)
           }
           
      } catch (error) {
         console.log(error , "error when get balance")
      }
    }
    getBalance()

  },[data])

  return (
    <div className='font-medium flex gap-2 text-md'>
        <div>User balance</div>
        <div>Rs : {data}</div>
    </div>
  )
}

export default Balance
