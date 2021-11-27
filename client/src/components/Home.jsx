import React from 'react';
import {Link} from 'react-router-dom';
//hooks
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import {cleanSearchByName, getAllVideogames, getGenres} from '../actions';
import Card from './Card';
import Pages from './Pages';
import SearchBar from './SearchBar';
export default function Home(){
   // --- HOOKS ---
   const dispatch = useDispatch();
   const allVideogames = useSelector((state) => state.videogames);
   const foundByName = useSelector(state=>state.searchByName);
   const genres = useSelector(state=>state.genres);
   useEffect(()=>{dispatch(getAllVideogames())},[]);
   useEffect(()=>{dispatch(getGenres())},[]);

    // --- Constants and states ---
    const genresNames = genres.map(g=>g.name);
    const [page,setPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const lastVideogameToShow = page*videogamesPerPage;
    const firstVideogameToShow = lastVideogameToShow-videogamesPerPage;
    //const currentVideogamesToShow = allVideogames.slice(firstVideogameToShow,lastVideogameToShow);
    // to filters
    const [filter,setFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('Strategy');
    const [order, setOrder] = useState('');
    // --- FUNCTIONS ---
    function handleButtonReaload(e) {
        e.preventDefault();
        dispatch(cleanSearchByName());
        dispatch(getAllVideogames());
        setPage(1);
        setGenreFilter('');
        setFilter('');
        setOrder('');
    };
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
    // What will we show?
    // if exists some search by name, then we will show those games, but if it doesn't exist
    // we have to show all videogames and the filters must be applicated over the games to show.
    var vg1 = [];   // array post search videogame by name or not
    foundByName.length ?  vg1 = foundByName :  vg1 = allVideogames;
    // then we will aplly the filters one to one over arrays
    var vg2 = []; // array post first filter - show by genre or created in our database
    switch(filter){
        case 'Genres':
            vg2 = vg1.filter(v=>v.genres.includes(genreFilter));
            break;
        case 'Created':
            vg2 = vg1.filter(v=>v.id.length>7);
            break;
        case 'Api':
            vg2 = vg1.filter(v=>Number.isInteger(v.id));
            break;
        case 'All':
            vg2=vg1;
            break;
        default:
            vg2 = vg1;
            break;
    }
    switch(order){
        case 'asc':
            vg2.sort(orderFunction);      
            break;      
        case 'des':
            vg2.sort(orderFunction).reverse();
            break;
        default:
            break;
    }
    var toShow = vg2;
    const currentVideogamesToShow = toShow.slice(firstVideogameToShow,lastVideogameToShow);


    
    // --- RETURNING ---
    return (
        <div>
            <div>
                <Link to='/videogame'>Create new videogame</Link>
                <button onClick={handleButtonReaload}>
                    Reaload
                </button>
                <Link to='/genres'>
                    <button>
                        View genres available
                    </button>
                </Link>
            </div>
            <div>
                <Pages videogamesPerPage={videogamesPerPage} toShow={toShow} changePage={changePage}/>
            </div>
            <div>
                <SearchBar/>
            </div>
            <div>
                <div>
                    <label htmlFor="">Show</label>
                    <select name="show" id="" onChange={handleFilter}>
                        <option value="All">All</option>
                        <option value="Created">Created</option>
                        <option value="Api">Api</option>
                        <option value="Genres">Genres</option>
                    </select>
                   { 
                   filter === 'Genres'? (
                   <select name="" id="" onChange={handleGenreFilter}>
                        {
                            genresNames.map(g=><option key={g} value={g}>{g}</option>)
                        } 
                    </select>): <div></div>
                    }
                </div>
                <label htmlFor="">Order</label>
                <select name="" id="" onChange={handleOrder}>
                    <option value="asc">Asc</option>
                    <option value="des">Des</option>
                </select>                
            </div>
            {            
            <div>
                {   currentVideogamesToShow.map(v=>(
                        <Card key={(v.id)} id = {v.id} name={v.name} image = {v.image} genres = {v.genres}/>
                    ))
                }
            </div>
            }
        </div>
    )
}