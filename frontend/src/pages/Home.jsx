import { Input } from '../component'
import Navbar from '../component/Navbar'
import Balance from '../component/Balance'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'
import UserCard from '../component/UserCard'

function Home() {

  // const data = useSelector(state => state.authSlice.userData)

  // console.log(data)
   
  const [userList , setUserList] = useState()

  useEffect(()=>{
    const getAllUser = async () =>{
        try {
                    const response = await axios.get('http://localhost:8000/api/v1/users/getAllUser' , {
                      headers : {
                        Authorization : "Bearer" + localStorage.getItem("loginToken" || "signUptoken")
                  
                      }
                    })
                    // console.log(response.data.user)
                    setUserList(response.data.user)
          }
        catch (error) {
          console.log(error , "error when getAlluser")
        }
      }

      getAllUser()

  },[])

  console.log(userList)

  return (
    <div className=' flex justify-center items-center h-screen w-screen'>
       <div className='pt-4 px-4 h-3/4 md:h-3/5 rounded-lg  bg-white md:w-2/4  w-5/6 '>
          <Navbar/>
          <div className='py-3 px-3'>
            <Balance/>
          </div>
          <div className='py-2 px-3 '>
             <div className='mb-3 font-medium'>User :</div>
             <Input placeHolder={'Search User'} className={' border-gray-300 border w-full rounded-lg'}/>
             <div className=' overflow-y-scroll  max-h-80'>
                  {
                    userList &&   userList.map((item , index)=> (
                      <UserCard  item={item} key={index}/>
                    ))
                  }
             </div>
          </div>
       </div>
    </div>

  )
}

export default Home
