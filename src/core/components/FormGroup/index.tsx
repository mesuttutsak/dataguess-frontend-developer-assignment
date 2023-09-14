import React from 'react'

const FormGroup = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='fromGroup'>
        {children}
    </div>
  )
}

export default FormGroup