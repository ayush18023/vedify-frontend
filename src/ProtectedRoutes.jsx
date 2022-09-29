import React, { Component, useEffect } from 'react'
import { Navigate, Route } from 'react-router-dom'

const ProtectedRoutes = ({children,auth}) => {
    if(!auth){
      return <Navigate to='/'/>
    }
    return children;
}

export default ProtectedRoutes