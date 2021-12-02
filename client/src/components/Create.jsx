import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { createVideogame, getGenres } from '../actions';
import style from '../styles/Create.module.css';
import {AiOutlineHome} from 'react-icons/ai';

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

// FUNCTION TO EXPORT - COMPONENT CREATE
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
    useEffect(()=>{dispatch(getGenres())},[dispatch]);
    const genresNames = genres.map(g=>g.name);
    const today = new Date();
    // --- FUNCTIONS ----

    function readyToSend(){
        var count = 0;
        for (let error in errors){
            if(error.length!==0){count=count+1;}
        }
        if(count===0){return true;}
        else{return false;}
    }

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
        if(!isNaN(form.rating) && readyToSend()){
            dispatch(createVideogame(form));
            form.name.length?alert(`${form.name} has been created!`):alert('Form is empty!');
        }else{
            alert('Please complete correctly the form.')
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
        <div className={style.all}>
            <div className= {style.alignHomeButton}>
                <Link to='/home'><button className={style.homeButton}><AiOutlineHome/></button></Link>
            </div>
            <form action="" onSubmit={handleSubmit} className={style.form}>
                <div className={style.nameAndURL}>
                    <div className={style.alignInputName}>
                        <input 
                        type="text"  
                        name='name' 
                        onChange={handleChange} 
                        value = {form.name}
                        className={style.inputName}
                        placeHolder='Name.'
                        />
                        {errors.name && (<p className={style.error}>{errors.name}</p>)}
                    </div>
                    <div className={style.alignInputURL}>
                        <input 
                        type="text"  
                        name='image' 
                        onChange={handleChange} 
                        value = {form.image}
                        className={style.InputURL}
                        placeholder='URL image.'
                        />
                    </div>
                </div>
                <div className={style.releasedAndRating}>
                    <div className={style.alignReleased}>
                        <input 
                        type="date" 
                        name='released'
                        min="1980-01-01" 
                        max={`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`}
                        onChange={handleChange}
                        value={form.date}
                        className={style.inputReleased}
                        placeholder='Released'
                        />
                        {errors.released && (<p className={style.error}>{errors.released}</p>)}    
                    </div>
                    <div className={style.alignInputRating}>
                        <input 
                        type="num" 
                        name='rating' 
                        onChange={handleChange}
                        value = {form.rating}
                        className={style.inputRating}
                        placeholder='Rating: 0-5'
                        />
                        {errors.rating && (<p className={style.error}>{errors.rating}</p>)}
                    </div>
                </div>
                <div>
                    <label htmlFor="" className={style.genres}>Genres</label>
                    <div className={style.genreSelector}>
                        {
                            genresNames.map(
                                g=>(
                                <div className={style.alignGenres}>
                                    <label htmlFor="">
                                    <input 
                                    key={g} 
                                    value={g}
                                    type='checkbox'
                                    onChange={handleCheckGenre}
                                    />{g}
                                    </label>
                                </div>)
                                )
                        }
                    </div>
                    {errors.genres && (<p className={style.error}>{errors.genres}</p>)} 
                </div>
                <div>
                    <label htmlFor="" className={style.platforms}>Platforms</label>
                    <div className={style.platformsSelector}>
                        <div className={style.alignPlatforms}>
                            <label htmlFor=""><input key="PC" type='checkbox' value="PC" onChange={handleCheckPlatforms}/>PC</label>
                        </div>
                        <div className={style.alignPlatforms}>
                            <label htmlFor=""><input key='PlayStation' type='checkbox' value="PlayStation" onChange={handleCheckPlatforms}/>PlayStation</label>
                        </div>
                        <div className={style.alignPlatforms}>
                            <label htmlFor=""><input key='Xbox' type='checkbox' value="Xbox"onChange={handleCheckPlatforms}/>Xbox</label>
                        </div>
                        <div className={style.alignPlatforms}>
                            <label htmlFor=""><input key='Apple' type='checkbox' value="Apple Macintosh"onChange={handleCheckPlatforms}/>Apple Macintosh</label>
                        </div>
                        <div className={style.alignPlatforms}>
                            <label htmlFor=""><input key='Nintendo' type='checkbox' value="Nintendo"onChange={handleCheckPlatforms}/>Nintendo   </label>                 
                        </div>
                    </div>
                    {errors.platforms && (<p className={style.error}>{errors.platforms}</p>)}
                </div>
                <div className={style.alignDescription}>
                    <textarea 
                    name="description" 
                    id="" 
                    cols="30" 
                    rows="10" 
                    onChange={handleChange}
                    value={form.description}
                    className={style.description}
                    placeholder='Please enter a complete description.'
                    >
                    </textarea>
                </div>
                {errors.description && (<p className={style.error}>{errors.description}</p>)}    
                <div className={style.alignCreateButton}>
                    <button type='submit' onSubmit={handleSubmit} className={style.createButton}>Create</button>
                </div>
            </form>
        </div>
    )
}