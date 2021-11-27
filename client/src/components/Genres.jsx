import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getGenres } from '../actions';

export default function Genres(){

    // HOOKS 
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    useEffect(()=>{dispatch(getGenres())},[]);


    return(
        <div>
            <Link to = '/home'><button>Home</button></Link>
            <ul>
                {
                    genres.map(g=><li key={g.id}>{g.name}</li>)
                }
            </ul>
        </div>
    )
}