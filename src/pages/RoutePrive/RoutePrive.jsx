import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import {Outlet, Navigate} from 'react-router-dom'

const RoutePrive = () => {

const {currentUser} = useContext(UserContext);
//console.log("Private", currentUser);

if (!currentUser) {
    return <Navigate to='/'/>
}

return (
        <div className='container'>
            <Outlet/>
        </div>
    );
   
};

export default RoutePrive;