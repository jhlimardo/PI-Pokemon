const initialState = {
    pokemons: [],
    loading: {
        loading: false,
        msg: ''
    }
}

function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                loading: {
                    loading: false,
                    msg: ''
                  }
            };
            case 'GET_POKE_TYPES':
                return {
                    ...state,
                    pokemons: action.payload
            };
            case 'GET_BY_NAME':
                return {
                    ...state,
                    pokemons: action.payload
            };
            case 'POKE_FILTER':
                return {
                    ...state,
                    pokemons: action.payload
            };
            case 'LOADING':
                return {
                    ...state,
                    loading: {
                        loading: true,
                        msg: action.payload
                    },
            }
        default:
            return state
    }
}

  

export default rootReducer;
