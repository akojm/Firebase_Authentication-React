import React, {useContext} from 'react';
import {UserContext} from '../context/UserContext'

const Home = () => {
const {currentUser} = useContext(UserContext)

    return (
        <div className='container p-5'>
            <h1 className='display-5 text-light' >
                {currentUser ? "Welcome friends" : "Hi, Sign Up or Sign In" }
            </h1>
        </div>
    );
};

export default Home;