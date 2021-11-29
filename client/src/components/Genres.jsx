import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getGenres } from '../actions';
import {AiOutlineHome} from 'react-icons/ai';
import style from '../styles/Genres.module.css';
export default function Genres(){

    // HOOKS 
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    useEffect(()=>{dispatch(getGenres())},[dispatch]);


    return(
        <div className={style.all}>
            <div className= {style.alignHomeButton}>
                <Link to = '/home'><button className={style.homeButton}><AiOutlineHome/></button></Link>
            </div>
            <h2>Currently we have the next genres in our API/Database.</h2>
            <ul className={style.list}>
                {
                    genres.map(g=><li key={g.id} className={style.item}>{g.name}</li>)
                }
            </ul>
        </div>
    )
}