import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  dbOrApi,
  ordenar,
  orderAttack,
  getByName,
  getPokeTypes,
  getByType,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./styles/Card.css";
import "./styles/Spinner.css";
import "./styles/Home.css";

//import {setPage, arrayPokemon, prevPage, nextPage}  from './Paging'
//import Search from './Search'

export default function Home() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const AllPokemons = useSelector((state) => state.pokemons); // Traigo del reducer todos los pokemons(e(el estado) y los guardo en una variable
  const loading = useSelector((state) => state.loading);
  const [, setOrder] = useState("");
  const types = useSelector((state) => state.types);
  
  // console.log("Estos son los tipos:", types);

  // -------------------------------------------------------------------------------------------
  // Paginación
  // -------------------------------------------------------------------------------------------
  let [page, setPage] = useState(0);
  let prox = 0;
  const paginacion = () => {
    if (prox === 0 && page === 0) {
      if (AllPokemons.length) {
        prox = prox + 9;
        return AllPokemons.slice(page, page + 9);
      }
      if (AllPokemons.info) return AllPokemons;
      return [];
    }
    if (page >= 9) {
      if (AllPokemons.length) {
        return AllPokemons.slice(page, page + 12);
      }
      if (AllPokemons.info) return AllPokemons;
      return [];
    }
  };
  const arrayPokemon = paginacion();

  const nextPage = () => {
    if (AllPokemons.length > page + 12) {
      if (prox === 9) {
        page = page + 9;
        setPage(page);
      } else {
        setPage(page + 12);
      }
    }
  };

  const prevPage = () => {
    if (page > 9) {
      setPage(page - 12);
    }
    if (page === 9) {
      setPage(page - 9);
    }
  };

  //------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  // Search Bar
  //---------------------------------------------------------------------------------
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
    setPage(0);
   
  }
  //------------------------------------------------------------------------------------
  // Search Bar
  //------------------------------------------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(name));
    setPage(0);
    setName("");
  }
  //----------------------------------------------------------------------------------
  // Traigo todos los pokemons y muestro un spinner mientras se cargan
  //----------------------------------------------------------------------------------

  useEffect(() => {
    if (!AllPokemons.length && !loading.loading) {
      dispatch(getPokemons());
      dispatch(getPokeTypes());
    }
  }, [dispatch, AllPokemons.length, loading.loading]);

  //-----------------------------------------------------------
  // Lo uso para recargar la pagina
  //-----------------------------------------------------------
  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    setPage(0);
  }

  //-----------------------------------------------------------
  // Filtro por Api o Creados
  //-----------------------------------------------------------
  function handledbOrApi(e) {
    e.preventDefault();
    dispatch(dbOrApi(e.target.value));
    setPage(0);
  }
  //------------------------------------------------------------
  // Ordenar por nombre
  //------------------------------------------------------------
  function handleOrder(e) {
    e.preventDefault();
    dispatch(ordenar(e.target.value));
    setPage(0);
    setOrder(`Ordenar por: ${e.target.value}`);
  }
  //-------------------------------------------------------------
  // Filtro por Ataque
  //-------------------------------------------------------------
  function handleOrderAttack(e) {
    e.preventDefault();
    dispatch(orderAttack(e.target.value));
    setPage(0);
    setOrder(`Ordenar por: ${e.target.value}`);
  }
  //----------------------------------------------------------
  // Filtro por tipo
  //----------------------------------------------------------
  function handleTypes(e) {
    e.preventDefault();
    dispatch(getByType(e.target.value));
    setPage(0);
  }



  return (
    <div>
      {/* <Navbar /> */}

      {/*Renderizo la barra de busqueda  */}
      <div className="home-father-container">
        <div className="home-container">
          <div className="home-buscar">
            <input
              className="home-input"
              // id="formulario"
              value={name}
              type="text"
              placeholder="Buscar pokemon..."
              onChange={(e) => {
                handleInputChange(e);
              }}
            />

            <button
              className="home-buscar-button"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Buscar
            </button>

          </div>
          {/* Fin barra de busqueda */}

          {/*Renderizo la barra de ordenamiento */}
          <div className="home-ordenar">
            {/* Agrego un boton para volver a cargar todos los pokemon */}
            <button
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Recargar Pokemons
            </button>
            <button
              onClick={() => {
                const mostrarVentana = document.getElementById("home-ventana");
                mostrarVentana.classList.toggle("home-ventana-visible");
              }}
            >
              Mostrar Filtros
            </button>
          </div>
          <div id="home-ventana" className="home-ventana">
            <div className="home-filtros">
              <select
                onChange={(e) => {
                  handleOrder(e);
                }}
              >
                <option disabled selected>Order By</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
              <select
                onChange={(e) => {
                  handleOrderAttack(e);
                }}
              >
                <option disabled selected>Attack</option>
                <option value="att-asc">Weack</option>
                <option value="att-desc">Strong</option>
              </select>
              <select
                onChange={(e) => {
                  handledbOrApi(e);
                }}
              >
                <option disabled selected>Created/Exist</option>
                <option value="all">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
              </select>

              <select
                onChange={(e) => {
                  handleTypes(e);
                }}
              >
                <option value="all">By Type</option>
                {types &&
                  types.map((type, index) => {
                    return (
                      <option key={index} value={type.name}>
                        {type.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        {/* Aqui rendrizo las PokeCards  y le pongo un loading*/}
        <div className="card-content">
          {loading.loading ? (
            <div className="spinner-padre">
              <div className="spinner">
                <div class="lds-dual-ring"></div>
              </div>
            </div>
          ) : (
            arrayPokemon?.map((e) => (
              <Link className="Link" to={"/home/" + e.id}>
                <Card
                  name={e.name}
                  image={
                    e.img ? (
                      e.img
                    ) : (
                      <img src="./img/picachu.png" alt="pikachu" />
                    )
                  }
                  type={e.types}
                />
              </Link>
            ))
          )}
        </div>
      </div>
      {/* Paginación */}
      {!loading.loading ? (
        <div className="paging-container">
          <button
            onClick={(e) => {
              prevPage(e);
            }}
          >
            Prev
          </button>
          <button
            onClick={(e) => {
              nextPage(e);
            }}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
