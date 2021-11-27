import React, { useEffect, useState } from 'react';
import { Link , useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getDetail } from '../actions';

export default function Detail(){
    // --- HOOKS ---
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(getDetail(id))},[dispatch]);
    const videogame = useSelector(state=>state.detail);
    console.log(videogame);
    return(
        <div>
            <Link to ='/home'>home</Link>
            {
                    <div>
                    <h1>{videogame.name}</h1>
                    <h2>{videogame.released}</h2>
                    <img src={videogame.image} alt="" height='300px' weight='400px'/>
                    <h2>{videogame.rating}</h2>
                    <p>{videogame.description}</p>
                    <p>Genres</p>
                    <ul>
                        {
                            videogame.genres && videogame.genres.map(g=><li key={g.id}>{g}</li>)
                        }
                    </ul>
                    <p>Platforms</p>
                    <ul>
                        {
                            videogame.platform && videogame.platform.map(g=><li key={g.id}>{g}</li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}