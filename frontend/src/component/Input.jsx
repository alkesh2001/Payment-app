import React, { forwardRef } from 'react'

const Input = forwardRef(function Input({
  type ="text",
  className ="",
  ...props 
} , ref ) {
return (
  <div>
     <input ref={ref} type={type} className={`outline-none px-3 py-1  ${className}`} {...props} />
  </div>

)
})



export default Input
