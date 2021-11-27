import React from 'react';

export default function Pages({videogamesPerPage,toShow,changePage}){
    const pages = [];
    for (let i=1; i<Math.ceil(toShow.length/videogamesPerPage); i++){
        pages.push(i);
    }
    
    return (
        <div>
            <ul>
                {
                    pages.map(n=> (
                    <ul>
                        <li key={String(n)}><a onClick={()=>changePage(n)}>{n}</a></li>
                    </ul>
                    ))
                }
            </ul>
        </div>
    )
}