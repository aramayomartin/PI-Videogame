import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { createVideogame, getGenres } from '../actions';


// internal FUNCTIONS
    // --- HANDLE ERRORS ---
    function validate(form){
        let errors = {};
        if(!form.name){
            errors.name='Name required.'
        } 
        if (!form.released){
            errors.released = 'Date released required.'    
        } 
        if(!form.rating){
            errors.rating='Rating required.'
        } 
        if(!form.genres.length){
            errors.genres = 'A genre is required.'
        } 
        if(!form.platforms.length){
            errors.platforms = 'A platform is required.'
        } 
        if(!form.description){
            errors.description = 'Description required.'
        }
    return errors;
    }
export default function Create(){
    // STATES AND CONSTANTS
    const [form,setForm]=useState({
        name:'',
        released:'',
        rating:'',
        genres:[],
        platforms:[],
        description:'',
        image:''
    });
    const [errors,setErrors] = useState({});

    const genres = useSelector(state=>state.genres);
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(getGenres())},[]);
    const genresNames = genres.map(g=>g.name);
    const today = new Date();
    // --- FUNCTIONS ----
    function handleChange(e){
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
        setErrors(validate({
            ...form,
            [e.target.name]:e.target.value        
        }));
    }


    function handleSubmit(e){
        e.preventDefault();
        if(!isNaN(form.rating)){
            dispatch(createVideogame(form));
        }else{
            alert('Rating must be a number.')
        }
    }
    function handleCheckGenre(e){
        if(e.target.checked){
            setForm({
                ...form,
                genres:[...form.genres,e.target.value]
            })
        }else{
            setForm({
                ...form,
                genres:form.genres.filter(g=>g!==e.target.value)
            })
        }
    }
    function handleCheckPlatforms(e){
        if(e.target.checked){
            setForm({
                ...form,
                platforms:[...form.platforms,e.target.value]
            })
        }else{
            setForm({
                ...form,
                platforms:form.platforms.filter(g=>g!==e.target.value)
            })
        }
    }


    return(
        <div>
            <div><h1>We'll create a new videogame in our database</h1></div>
            <Link to='/home'><button>Home</button></Link>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Name</label>
                    <input 
                    type="text"  
                    name='name' 
                    onChange={handleChange} 
                    value = {form.name}
                    />
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label htmlFor="">URL image</label>
                    <input 
                    type="text"  
                    name='image' 
                    onChange={handleChange} 
                    value = {form.image}
                    />
                </div>
                <div>
                    <label htmlFor="">Released</label>
                    <input 
                    type="date" 
                    name='released'
                    min="1980-01-01" 
                    max={`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`}
                    onChange={handleChange}
                    value={form.date}
                    />
                    {errors.released && (<p>{errors.released}</p>)}    
                </div>
                <div>
                    <label htmlFor="">Rating</label>
                    <input 
                    type="num" 
                    name='rating' 
                    onChange={handleChange}
                    value = {form.rating}
                    />
                    {errors.rating && (<p>{errors.rating}</p>)}
                </div>
                <div>
                    <label htmlFor="">Genres</label>
                    <div>
                        {
                            genresNames.map(
                                g=>(
                                <label htmlFor="">
                                <input 
                                key={g} 
                                value={g}
                                type='checkbox'
                                onChange={handleCheckGenre}
                                />{g}
                                </label>)
                                )
                        }
                    </div>
                    {errors.genres && (<p>{errors.genres}</p>)} 
                </div>
                <div>
                    <label htmlFor="">Platforms</label>
                    <div>
                        <label htmlFor=""><input key="PC" type='checkbox' value="PC" onChange={handleCheckPlatforms}/>PC</label>
                        <label htmlFor=""><input key='PlayStation' type='checkbox' value="PlayStation" onChange={handleCheckPlatforms}/>PlayStation</label>
                        <label htmlFor=""><input key='Xbox' type='checkbox' value="Xbox"onChange={handleCheckPlatforms}/>Xbox</label>
                        <label htmlFor=""><input key='Apple' type='checkbox' value="Apple Macintosh"onChange={handleCheckPlatforms}/>Apple Macintosh</label>
                        <label htmlFor=""><input key='Nintendo' type='checkbox' value="Nintendo"onChange={handleCheckPlatforms}/>Nintendo   </label>                 
                    </div>
                    {errors.platforms && (<p>{errors.platforms}</p>)}
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <textarea 
                    name="description" 
                    id="" 
                    cols="30" 
                    rows="10" 
                    onChange={handleChange}
                    value={form.description}
                    >
                    </textarea>
                    {errors.description && (<p>{errors.description}</p>)}    
                </div>
                <button type='submit' onSubmit={handleSubmit}>Create</button>
            </form>
        </div>
    )
}