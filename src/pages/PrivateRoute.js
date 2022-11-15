import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const {sessionKey} = useSelector(state => state.api);
    const location = useLocation();

    if (!sessionKey) {
        return <Navigate to='/api-key' state={{return_url: location.pathname}} />
    }

    

  return children
}

export default PrivateRoute