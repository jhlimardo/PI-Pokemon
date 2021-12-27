/* eslint-disable array-callback-return */
const initialState = {
    pokemons: [],
    allPokemon: [],
    types: [],
    pokeTypes: [],
    pokeDetail: [],
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
                allPokemon: action.payload,
                loading: {
                    loading: false,
                    msg: ''
                  }
            };
            case 'GET_POKE_TYPES':
              //console.log('REDUCER TIPOS', action.payload)
                return {
                    ...state,
                    types: action.payload
            };

            case "GET_BY_TYPE":
              const allPoke = state.allPokemon;
              const filteredByTypes =
                allPoke.filter((poke) => poke.types.find(t => {
                  if (t.name === action.payload) {                     
                    return poke
                  } 
                }));               
                return {
                  ...state,
                  pokemons: filteredByTypes,          
                };

            case 'GET_BY_NAME':
              //console.log('REDUCER POR NOMBRE', action.payload)
                return {
                    ...state,
                    pokemons: action.payload,
            };


            case 'GET_BY_ID':
              //console.log("Desde Reducer ID", action.payload)
                return {
                    ...state, 
                    pokeDetail: action.payload,

            };

            case 'LOADING':
                return {
                    ...state,
                    loading: {
                        loading: true,
                        msg: action.payload
                    },
            }
            case 'ORDENAR':
                let order;
                
                if (action.payload === "asc") {
                  order = state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                      return 1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                      return -1;
                    }
                    return 0;
                  });
                }
                if (action.payload === "desc") {
                  order = state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                      return -1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                      return 1;
                    }
                    return 0;
                  }); 
                }
                return { ...state, pokemons: order 
            };
                
            case 'ORDENAR_ATTACK':
                let orderAttack;
                // const allPoke2 = state.allPokemon;
                
                if (action.payload === "att-asc") {
                  orderAttack = state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                      return 1;
                    }
                    if (a.attack < b.attack) {
                      return -1;
                    }
                    return 0;
                  });
                }
                if
                (action.payload === "att-desc") {                
                  orderAttack = state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                      return -1;
                    }
                    if (a.attack < b.attack) {
                      return 1;
                    }
                    return 0;
                  });
                }
                return { ...state, 
                  pokemons: orderAttack,
            };
            
            case "DB_OR_API":
                const allPokes = state.allPokemon;
                const filtrado = action.payload === "created" 
                ? allPokes.filter(p => p.createdInDb) : 
                allPokes.filter(p => !p.createdInDb);

                return {
                    ...state,
                    pokemons: action.payload === "all" ? state.allPokemon : filtrado,
                }
            case "ADD_POKEMON":
                return {
                     ...state,
                     pokemons: action.payload
            }; 

          
          case "DELETE_BY_ID":
              return {
                  ...state,
                  pokeDelete: action.payload
          };
          case "PUT_BY_ID":
              return {
                  ...state,
                  pokePut: action.payload
          };

        default:
            return state
    }
}

  

export default rootReducer;
