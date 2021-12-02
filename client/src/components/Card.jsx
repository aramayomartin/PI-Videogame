import React from 'react';
import {Link} from 'react-router-dom';
import style from '../styles/Card.module.css';
export default function Card({id,image,name,genres,rating}){

    return(
        
        <Link to={`/videogame/${id}`} className={style.title}><div className={style.card}>
            <h3 className={style.title}>{name}</h3 >
            <img src={image} alt="" className={style.image}/>
            <p>{`Rating: ${rating}.`}</p>
            <p>Genres: {Number.isInteger(id)? genres.join('-'):genres.map(g=>g.name).join(',')}.</p>
        </div></Link>
    )
}