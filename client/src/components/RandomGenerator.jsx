import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getRandom } from '../actions';
import style from '../styles/RandomGenerator.module.css';
import {AiOutlineHome,AiOutlineReload} from 'react-icons/ai';

export default function RandomGenerator(){
    const [id,setId] = useState(String(Math.floor(Math.random()*10000)));
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getRandom(id))
    },[dispatch,id]);
    const videogame = useSelector(state=>state.random);

function reloadRandom(e){
    e.preventDefault();
    setId(String(Math.floor(Math.random()*10000)));
}
function insertDescription(){
    setTimeout(()=>{
     document.getElementById('description').innerHTML=videogame.description;
    },10);
    }


    return(
        <div className={style.all}>
                <div className= {style.alignHomeButton}>
                    <Link to = '/home'><button className={style.homeButton}><AiOutlineHome/></button></Link>
                    <button onClick={reloadRandom} className={style.reloadButton}>
                        <AiOutlineReload/>
                    </button>                
                </div>
            {
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
            }
        </div>
    )
}