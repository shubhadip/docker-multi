import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
    return (
        <>
            <div>
                I am Other page
            </div>
            <p>
                <Link to='/'>Homepage</Link>
            </p>
        </>
    )
}

export default OtherPage;