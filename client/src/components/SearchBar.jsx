import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { getAllVideogames, getVideogameByName } from '../actions';

export default function SearchBar(){
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
    }
    // --- RETURNING ---
    return(
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input id = 'search-input' placeholder="Search Videogame" onChange={handleChange}/>
                <button type='Submit'>Search</button>
            </form>
        </div>
    )
}