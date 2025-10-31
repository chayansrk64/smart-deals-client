import React, { use } from 'react';
import { AuthContext } from '../providers/AuthContext';

const PrivateRoutes = ({children}) => {
    const {user, loading} = use(AuthContext);

    if(loading){
        return <span className="loading loading-spinner text-warning"></span>
    }

    if(user){
        return children
    }
    
};

export default PrivateRoutes;