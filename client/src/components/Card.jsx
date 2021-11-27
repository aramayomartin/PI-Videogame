import React from 'react';
import {Link} from 'react-router-dom';

export default function Card({id,image,name,genres}){

    return(
        <div>
            <Link to={`/videogame/${id}`}><p>{name}</p></Link>
            <img src={image} alt="" width='150 px' height='100px'/>
            <p>{Number.isInteger(id)? genres.join(','):genres.map(g=>g.name).join(',')}</p>
        </div>
    )
}