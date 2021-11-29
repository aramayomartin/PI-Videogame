import React from 'react';
import {Link} from 'react-router-dom';
import Styles from '../styles/LandingPage.module.css';
import {AiOutlineHome} from 'react-icons/ai';
export default function LandingPage(){
    return(
        <div className={Styles.all}>
            <h1 className={Styles.title}>Welcome to my final project!</h1>
            <Link to='/home'>
                <button className={Styles.homeButton}>
                <AiOutlineHome/>
                </button>
            </Link>
        </div>
    )
}