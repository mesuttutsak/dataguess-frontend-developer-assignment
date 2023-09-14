import React from 'react'
import State from '../State'

const Loader = () => {
  return (
    <State theme='loader'>
        <div></div>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        <div></div>
    </State>
  )
}

export default Loader