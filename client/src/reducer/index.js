
const initialState = {
    videogames:[],
    searchByName: [],
    detail: [],
    genres: [],
    detail:{}
}



function reducer(state = initialState,action){
    switch(action.type){
        case 'GET_ALL_VIDEOGAMES':
            return {
                ...state,
                videogames:action.payload
            };
        case 'GET_VIDEOGAME_BY_NAME':
            return{
                ...state,
                searchByName:action.payload
            }
        case 'CLEAN_SEARCH_BY_NAME':
            return {
                ...state,
                searchByName:[]
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload                
            }
        case 'CREATE_VIDEOGAME':
            return state
        case 'GET_DETAIL':
            return {
                ...state,
                detail : action.payload
            }
        default:
            return state;
    }
}

export default reducer;