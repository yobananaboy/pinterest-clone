import React from 'react';
import { Link } from 'react-router-dom';

export const Error404 = () => {
    return (
        <div className="error-message">
            <h3>
                Whoops, something went wrong. Please return <Link to='/'>home</Link> to try again.
            </h3>
        </div>
        );
};