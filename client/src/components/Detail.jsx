import React, { useEffect } from 'react';
import { Link , useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getDetail } from '../actions';

export default function Detail(){
    // --- HOOKS ---
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch,id]);
    const videogame = useSelector(state=>state.detail);

    return(
        <div>
            <Link to ='/home'>home</Link>
            {
                <div>
                    <h1>
                        {
                        videogame.name && videogame.name
                        }
                    </h1>
                    <h2>
                        {
                        videogame.released && videogame.released      
                        }
                    </h2>
                    <img 
                    src={
                        videogame.image && videogame.image   
                        } alt="" height='300px' weight='400px'/>
                    <h2>
                        {
                        videogame.rating && videogame.rating    
                        }
                    </h2>
                    <p>
                        {
                        videogame.description && videogame.description         
                        }
                    </p>
                    <p>Genres</p>
                    <ul>
                        {
                           id.includes('-')?
                            videogame.genres && videogame.genres.map(g=><li key={g.name}>{g.name}</li>):
                            videogame.genres && videogame.genres.map(g=><li key={g}>{g}</li>)
                        }
                    </ul>
                    <p>Platforms</p>
                    <ul>
                        {
                            videogame.platforms &&
                            videogame.platforms.map(g=><li key={g}>{g}</li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}