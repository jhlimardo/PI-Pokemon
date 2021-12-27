import axios from "axios";


// Traigo todos los pokemons
export function getPokemons() {
  return async function (dispatch) {
    console.log("Estoy Loading");
    dispatch({ type: "LOADING", payload: "Buscando Pokemons..." });
    const json = await axios.get(`/pokemons`);
    // console.log(json.data);
    const res = json.data;
    // console.log("desde actions", res);
    return dispatch({
      type: "GET_POKEMONS",
      payload: res,
    });
  };
}

// Traigo los tipos
export function getPokeTypes() {
  return async (dispatch) => {
    var json = await axios.get(`/types`);
    return dispatch({
      type: "GET_POKE_TYPES",
      payload: json.data,
    });
  };
}

//Traigo los pokemons con un determinado nombre -> exacto
export function getByName(name) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`/pokemons?name=${name}`);
      return dispatch({
        type: "GET_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      alert("Pokemon No Encontrado");
      console.log(error);
    }
  };
}

// Traigo un pokemon segun su ID y lo muestro en detalles
export function getById(id) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`/pokemons/${id}`);
      //console.log("Desde Actions", json.data);
      return dispatch({
        type: "GET_BY_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Filtro segun el Tipo
export function getByType(payload) {
  return async function (dispatch) {
    try {
      dispatch({
        type: "GET_BY_TYPE",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Ordeno ascendente o descendente
export function ordenar(order) {
  return async function (dispatch) {
    try {
      dispatch({
        type: "ORDENAR",
        payload: order,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Filtrar por ataque
export function orderAttack(orderAttack) {
  return async function (dispatch) {
    try {
      dispatch({
        type: "ORDENAR_ATTACK",
        payload: orderAttack,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Agregar un pokemon a la DB
export function addPokemon(payload) {
  return async (dispatch) => {
    try {
      var json = await axios.post(`/pokemons`, payload);
      return dispatch({
        type: "ADD_POKEMON",
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Filtrar segun sean de la API o de la DB
export function dbOrApi(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: "DB_OR_API",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Borrar un pokemon de la DB
export function deleteById(id) {
  return async (dispatch) => {
    try {
      var json = await axios.delete(`/pokemons/${id}`);
      //console.log("Desde Actions", json.data);
      return dispatch({
        type: "DELETE_BY_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Modificar un pokemon de la DB
export function putById(id) {
  return async (dispatch) => {
    try {
      var json = await axios.put(`/pokemons/${id}`);
      //console.log("Desde Actions", json.data);
      return dispatch({
        type: "PUT_BY_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}