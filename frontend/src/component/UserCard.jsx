import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botton from './Botton'
function UserCard({item}) {

    const navigate = useNavigate();

  return (
    <div className='flex justify-between px-3 bg-gray-200 rounded-lg items-center py-3 my-2'>
      <div className='flex gap-4 items-center'>
        <div className='bg-gray-500 h-10 flex items-center justify-center font-medium text-lg text-white w-10 rounded-full'>
            {item.username[0]}
        </div>
        <div className='font-medium'>
            {item.username}
        </div>
      </div>
      <div className=''>
           <Botton   
           className="font-medium  text-sm md:text-md  bg-gray-800 px-3 py-2 md:px-4 md:py-2  rounded-lg"
           onClick={()=>  { navigate('/sendMoney?id=' + item._id + "&name=" + item.username)}}
              value={"send Money"}
           />
      </div>
    </div>
  )
}

export default UserCard
