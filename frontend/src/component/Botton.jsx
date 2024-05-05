import React, { forwardRef } from 'react'

const Botton = forwardRef(function Botton(
  { 
    value ="",
    className ="" ,
    ...props
  }, ref) {
  return (
    <div>
      <button ref={ref} {...props} className={`px-3 py-1 bg-black text-white ${className}`}>
           {value}
      </button>
    </div>
  )
})


export default Botton
