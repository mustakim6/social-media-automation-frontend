import React from 'react'
import { logOutuser } from '../services/api.js'

const LogOutBtn = () => {

    const handleLogout = async ()=>{

        const response = await logOutuser()
        console.log("logout response:", response)
    }
  return (
    <div>
        <button style={{backgroundColor:"red"}} onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default LogOutBtn