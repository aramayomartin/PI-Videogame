import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/Home.module.css';
// icons
import {IoMdAdd} from 'react-icons/io';
import {AiOutlineReload} from 'react-icons/ai';
import {FaRandom} from 'react-icons/fa';
//hooks import
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import {cleanAll, getAllVideogames, getGenres} from '../actions';
// Components
import Card from './Card';
import Pages from './Pages';
import SearchBar from './SearchBar';
// principal component
export default function Home(){
   // --- HOOKS ---
   const dispatch = useDispatch();
   const allVideogames = useSelector((state) => state.videogames);
   const foundByName = useSelector(state=>state.searchByName);
   const genres = useSelector(state=>state.genres);
   const searchByNameFlag = useSelector(state=>state.searchByNameFlag);
   useEffect(()=>{dispatch(getAllVideogames())},[dispatch]);
   useEffect(()=>{dispatch(getGenres())},[dispatch]);
    // --- Constants and states ---
    const genresNames = genres.map(g=>g.name);
    const [page,setPage] = useState(1);
    const [videogamesPerPage, _] = useState(15);
    const lastVideogameToShow = page*videogamesPerPage;
    const firstVideogameToShow = lastVideogameToShow-videogamesPerPage;
    // to filters
    const [filter,setFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('-');
    const [order, setOrder] = useState('');
    // --- FUNCTIONS ---
    function handleButtonReaload(e) {
        e.preventDefault();
        dispatch(cleanAll());
        dispatch(getAllVideogames());
        //dispatch(cleanDetail());
        setPage(1);
        setGenreFilter('');
        setFilter('');
        setOrder('');
        document.getElementById('selectorShow').selectedIndex  =0;
        document.getElementById('selectorAlph').selectedIndex  =0;
        document.getElementById('selectorRating').selectedIndex  =0;
    };
    function handleReloadFilter(e){
        e.preventDefault();
        setPage(1);
        setGenreFilter('');
        setFilter('');
        setOrder('');
        document.getElementById('selectorShow').selectedIndex  =0;
        document.getElementById('selectorAlph').selectedIndex  =0;
        document.getElementById('selectorRating').selectedIndex  =0;
    }
    function changePage(page) {
        setPage(page);
    }
    //  functions to handle filters and order
    function handleFilter(e){
        e.preventDefault();
        setFilter(e.target.value);
    }
    function handleGenreFilter(e){
        e.preventDefault();
        setGenreFilter(e.target.value);
    }
    function handleOrder(e){
        e.preventDefault();
        setOrder(e.target.value);
    }
    function orderFunction(a,b){
            if (a.name > b.name) {return 1;}
            if (a.name < b.name) {return -1;}
            return 0;
    }
    function orderRatingFunction(a,b){
        if (parseFloat(a.rating) > parseFloat(b.rating)) {return 1;}
        if (parseFloat(a.rating) < parseFloat(b.rating)) {return -1;}
        return 0;
    }
    // What will we show?
    // if exists some search by name, then we will show those games, but if it doesn't exist
    // we have to show all videogames and the filters must be applicated over the games to show.
    var searchVideogame_allVideogame = [];   // array post search videogame by name or not
    foundByName.length ?  searchVideogame_allVideogame = foundByName :  searchVideogame_allVideogame = allVideogames;
    // then we will aplly the filters one to one over arrays
    var postFilter_genreOrCreated = []; // array post first filter - show by genre or created in our database
    switch(filter){
        case 'Genres':
            postFilter_genreOrCreated = searchVideogame_allVideogame.filter(v=>v.genres.includes(genreFilter) || v.genres.map(e=>e.name).includes(genreFilter));
            break;
        case 'Created':
            postFilter_genreOrCreated = searchVideogame_allVideogame.filter(v=>v.id.length>7);
            break;
        case 'Api':
            postFilter_genreOrCreated = searchVideogame_allVideogame.filter(v=>Number.isInteger(v.id));
            break;
        case 'All':
            postFilter_genreOrCreated=searchVideogame_allVideogame;
            break;
        default:
            postFilter_genreOrCreated = searchVideogame_allVideogame;
            break;
    };
    switch(order){
        case 'asc':
            postFilter_genreOrCreated.sort(orderFunction).reverse(); 
            break;      
        case 'des':
            postFilter_genreOrCreated.sort(orderFunction);
            break;
        case 'ascR':
            postFilter_genreOrCreated.sort(orderRatingFunction).reverse();
            break;
        case 'desR':
            postFilter_genreOrCreated.sort(orderRatingFunction);
            break;
        default:
            break;
    }
    var toShow = postFilter_genreOrCreated;     
    const currentVideogamesToShow = toShow.slice(firstVideogameToShow,lastVideogameToShow);
    // --- RETURNING ---
    return (
        <div>
            <div className={styles.nav}>
                <div>
                    <SearchBar setPage = {setPage}/>
                </div>
                <div className={styles.buttons}>
                    <Link to='/videogame' ><button className={styles.addVideogame}><IoMdAdd/></button></Link>
                    <button onClick={handleButtonReaload} className={styles.reloadButton}>
                        <AiOutlineReload/>
                    </button>
                    <Link to='/genres'>
                        <button className={styles.viewGenresButton}>
                            View genres
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <Pages actualPage= {page} videogamesPerPage={videogamesPerPage} toShow={toShow} changePage={changePage}/>
            </div>
            
            <div className={styles.filters}>
                <div>
                    <label htmlFor="">Show</label>
                    <select name="show" id="selectorShow" onChange={handleFilter} className={styles.showSelector}>
                        <option value="All">All</option>
                        <option value="Created">Created</option>
                        <option value="Api">Api</option>
                        <option value="Genres">Genres</option>
                    </select>
                   { 
                   filter === 'Genres'? (
                   <select name="" id="selectorGenre" onChange={handleGenreFilter} className={styles.genreSelector}>
                        <option value="-" key='-'>-</option>
                        {
                            genresNames.map(g=><option key={g} value={g}>{g}</option>)
                        } 
                    </select>): <div></div>
                    }
                </div>
                <select name="" id="selectorAlph" onChange={handleOrder} className={styles.orderSelector}>
                    <option value="-" key='--'>-</option>
                    <option value="asc" key='asc'>Alph Asc</option>
                    <option value="des" key='desc'>Alph Desc</option>
                </select>         
                <select name="" id="selectorRating" onChange={handleOrder} className={styles.orderSelector}>
                    <option value="-" key='---'>-</option>
                    <option value="ascR" key='ascR'>Rating Asc</option>
                    <option value="desR" key='descR'>Rating Desc</option>
                </select>
                <button className={styles.viewGenresButton} onClick={handleReloadFilter}>Reload filters</button>         
            </div>
            
            {
                allVideogames.length?(
                searchByNameFlag && !foundByName.length?
                <h1>Videogame not founded!</h1>
                :
                toShow.length ?(
                <div className={styles.toAlign}>
                    <div className={styles.cards}>        
                        {   currentVideogamesToShow.map(v=>(
                                <Card 
                                key={(v.id)} 
                                id = {v.id} 
                                name={v.name} 
                                image = {v.image} 
                                genres = {v.genres} 
                                rating={v.rating}
                                />
                            ))
                        }
                    </div>
                </div>):
                <h1 className={styles.notFounded}>Empty.</h1>
                )
                :
                <img src="https://i.pinimg.com/originals/a9/02/16/a902167cae8538769ad56ec7514ce73c.gif" alt="" />
            }
            <div>
                <Pages actualPage = {page} videogamesPerPage={videogamesPerPage} toShow={toShow} changePage={changePage}/>
            </div>
            <div className={styles.random}>
                <p>Are you tired to play always the same game? Try with our random game generator!</p>
                <Link to='random'>
                    <button className={styles.randomButton}>
                        <FaRandom/>
                    </button>
                </Link>
            </div>
        </div>
    )
}