
const initialState = {
    videogames:[],
    searchByName: [],
//    detail: [],
    genres: [],
    detail:{},
    random:{description:''},
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
                searchByName:action.payload,
            }
        case 'CLEAN_ALL':
            return {
                ...state,
                searchByName:[],
                videogames:[],
                detail:{}
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
                detail : Array.isArray(action.payload)?action.payload[0]:action.payload
            }
        case 'GET_RANDOM':
            return {
                ...state,
                random : Array.isArray(action.payload)?action.payload[0]:action.payload
            }
        default:
            return state;
    }
}

export default reducer;