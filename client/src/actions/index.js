import axios from 'axios';

export function getAllVideogames(){
    return async function(dispatch){
        var v = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: "GET_ALL_VIDEOGAMES",
            payload: v.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        var v = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: "GET_GENRES",
            payload: v.data
        })
    }
}

export function getVideogameByName(name){
    return async function(dispatch){
        var v = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        return dispatch({
            type:'GET_VIDEOGAME_BY_NAME',
            payload: v.data
        })
    }
}

export function cleanSearchByName(){
    return function(dispatch){
        return dispatch({
            type:'CLEAN_SEARCH_BY_NAME',
        })
    }
}

export function createVideogame(newVideogame){
    return async function(dispatch){
        await axios.post('http://localhost:3001/videogame',newVideogame)
        return dispatch({
            type: 'CREATE_VIDEOGAME'
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var v = await axios.get(`http://localhost:3001/videogame/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: v.data,
            })
        }catch(e) {
            console.log(e);
        }
    }
}


