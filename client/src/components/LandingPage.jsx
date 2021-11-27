import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>Go to home</h1>
            <Link to='/home'>
                <button>
                    poner botoncito
                </button>
            </Link>
        </div>
    )
}