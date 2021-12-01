import axios from 'axios';



// Traigo todos los Pokemons
// export function getPokemons(){
//     return async function(dispatch){
//         var json = (await axios.get(`http://localhost:3001/pokemons`));        
//         return dispatch({
//             type: "GET_POKEMONS",
//             payload: json.data,
//         });
//     };
// }

export function getPokemons(){
        return function(dispatch){
            dispatch({  type: "LOADING", payload: 'Buscando Pokemons...' });
            return axios.get(`http://localhost:3001/pokemons`)
            .then (res => res.data)
            .then (data => {
                dispatch({ type: "GET_POKEMONS", payload: data });
                
            });
        };
    }

// Traigo los tipos
export function getPokeTypes () {
    return async (dispatch) => {
        var json = (await axios.get(`http://localhost:3001/types`));   
        return dispatch({
            type: "GET_POKE_TYPES",
            payload: json.data,
    });
  };
}

export function getByName (name) {
    return async (dispatch) => {
            name = name.toLowerCase();
            var json = (await axios.get(`http://localhost:3001/pokemons?name=${name}`));  
        return dispatch({
            type: "GET_BY_NAME",
            payload: json.data,
    });
  };
}

export function pokeFilter (num) {
    return async (dispatch) => {
        var json = (await axios.get(`http://localhost:3001/pokemons?number=${num}`));  
        return dispatch({
            type: "POKE_FILTER",
            payload: json.data,
    });
  };
}

export function type (type) {
    return (dispatch) => {
        return dispatch({
            type: "TYPE",
            payload: type,
    });
  }
}
     

export function ordenar (order) {
    return (dispatch) => {
        return dispatch({
            type: "ORDENAR",
            payload: order,
    });
  };
}

export function add (pokemon) {
    return (dispatch) => {
        return dispatch({
            type: "ADD",
            payload: pokemon,
    });
  };

}