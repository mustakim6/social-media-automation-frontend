import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { loading, isAuthenticated} = useAuth()

    if(loading){
        return <h3>Checking authentication..</h3>
    }

    if(!isAuthenticated){
      return  <Navigate to="/login"></Navigate>
    }

  return <Outlet/>
}

export default ProtectedRoute