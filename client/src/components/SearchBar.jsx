import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { getAllVideogames, getVideogameByName } from '../actions';
import styles from '../styles/SearchBar.module.css';
import {AiOutlineSearch} from 'react-icons/ai';

export default function SearchBar({setPage}){
    // --- HOOKS---
    const dispatch = useDispatch();
    // --- LOCAL STATE ---
    const [search,setSearch] = useState('');
    // --- FUNCTIONS ---
    function handleChange(e){
        e.preventDefault();
        setSearch(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        search.length ? dispatch(getVideogameByName(search)):
        getAllVideogames();
        document.getElementById('search-input').value='';
        setPage(1);
    }
    // --- RETURNING ---
    return(
        <div>
            <form action="" onSubmit={handleSubmit} className={styles.searchForm}>
                <input id = 'search-input' placeholder="Search Videogame" onChange={handleChange} className={styles.input}/>
                <button type='Submit' className={styles.searchButton}><AiOutlineSearch/></button>
            </form>
        </div>
    )
}