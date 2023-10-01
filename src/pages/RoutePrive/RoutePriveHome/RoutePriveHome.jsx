import React from 'react';
import djSet from './dj-set.gif';

const RoutePriveHome = () => {
    return (
        <div className='container p-5'>
            <h1 className="display-3 text-light mb-4">
                Home sweet Private Home
            </h1>
            <img src={djSet} alt="dj_picture" />
        </div>
    );
};

export default RoutePriveHome;