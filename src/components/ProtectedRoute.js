import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {

    let auth = true
  return (
 <>
    {
        auth ? <Outlet /> : <Navigate to={"/"} />
    }
 </>
  )
}
