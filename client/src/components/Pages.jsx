import React from 'react';
import styles from '../styles/Pages.module.css';

export default function Pages({actualPage,videogamesPerPage,toShow,changePage}){
    const pages = [];
    for (let i=1; i<Math.ceil(toShow.length/videogamesPerPage); i++){
        pages.push(i);
    }
    
    return (
        <div>
            <ul className = {styles.pages}>
                {
                    pages.map(n=> (
                        <li key={String(n)} className={n===actualPage?styles.actualPage:styles.items}><a onClick={()=>changePage(n)}>{n}</a></li>
                    ))
                }
            </ul>
        </div>  
    )
}