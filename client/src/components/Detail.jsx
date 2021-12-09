import React, { useEffect } from 'react';
import { Link , useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getDetail } from '../actions';
import style from '../styles/Detail.module.css';
import {AiOutlineHome} from 'react-icons/ai';

export default function Detail(){
    // --- HOOKS ---
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(getDetail(id))},[dispatch,id]);
    const videogame = useSelector(state=>state.detail);

    function insertDescription(){
    setTimeout(()=>{
     document.getElementById('description').innerHTML=videogame.description;
    },10);
    }

    return(
        <div className={style.all}>
                <div className= {style.alignHomeButton}>
                    <Link to = '/home'><button className={style.homeButton}><AiOutlineHome/></button></Link>
                </div>
            {
                Object.keys(videogame).length?
                <div>
                    
                    <h1>
                        {
                        videogame.name && videogame.name
                        }
                    </h1>
                    <div className={style.alignReleased}>
                        <h2> {`Released at  
                            ${
                            videogame.released && videogame.released      
                            }.`}
                        </h2>
                    </div>
                    <img 
                    src={
                        videogame.image && videogame.image   
                        } alt="" className={style.image}/>
                    <div className={style.alignRating}>
                        <h2>
                            {`Rating : ${
                            videogame.rating && videogame.rating    
                            }/5.`}
                        </h2>
                    </div>
                    <div id='description' className={style.description}>
                        {
                           id.includes('-')?
                           videogame.description && <p>{videogame.description}</p>:
                           videogame.description && insertDescription() 
                        }                    
                    </div>
                    <h2 className={style.alignGenre}>Genres</h2>
                    <ul className={style.unorderList}>
                        {
                           id.includes('-')?
                            videogame.genres && videogame.genres.map(g=><li className={style.item} key={g.name}>{g.name}</li>):
                            videogame.genres && videogame.genres.map(g=><li className={style.item} key={g}>{g}</li>)
                        }
                    </ul>
                    <h2 className={style.alignPlatforms}>Platforms</h2>
                    <ul className={style.unorderList}>
                        {
                            videogame.platforms &&
                            videogame.platforms.map(g=><li className={style.item} key={g}>{g}</li>)
                        }
                    </ul>
                </div>
                :
                <h1>Videogame not found!</h1>
                
        }
        </div>
    )
}