import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addPokemon, getPokeTypes } from "../actions";
import "./styles/Form.css";

export default function Form() {
  const dispatch = useDispatch();
  //  const AllPokemons = useSelector(state => state.pokemons)
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [pokemon, setPokemon] = useState({
    name: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    img: "https://cdn.pixabay.com/photo/2016/08/06/08/05/pokemon-1574006_960_720.png",
    type: [],
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value.toLowerCase(),
      [e.target.type]: e.target.value,
      [e.target.life]: e.target.value,
      [e.target.attack]: e.target.value,
      [e.target.defense]: e.target.value,
      [e.target.speed]: e.target.value,
      [e.target.height]: e.target.value,
      [e.target.weight]: e.target.value,
      [e.target.img]: e.target.value,
    });
    //console.log(pokemon)
  };

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(pokemon);
    if (
      pokemon.name === "" ||
      pokemon.type === [] ||
      pokemon.life <= 0 ||
      pokemon.attack <= 0 ||
      pokemon.defense <= 0 ||
      pokemon.speed <= 0 ||
      pokemon.height <= 0 ||
      pokemon.weight <= 0
    ) {
      setError(true);
      return;
    }
    dispatch(addPokemon(pokemon));
    alert("Pokemon added!");
    setPokemon({
      name: "",
      life: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      img: "",
      type: [],
    });
    history.push("/Home");
  }

  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      type: eliminarSeleccion(pokemon.type, e.target.value),
    });
  }

  function eliminarSeleccion(array, sel) {
    if (array.includes(sel)) {
      const array1 = array.filter((num) => num !== sel);
      return array1;
    } else {
      const array2 = array.concat(sel);
      return array2;
    }
  }

  useEffect(() => {
    dispatch(getPokeTypes());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <Fragment>
      <div className="form-container">
        <div className="from-row">
          <div className="col-md-6 offset-md-3">
            <h1 className="form-text-center">Create Pokemon</h1>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="form-group">
                <label className="form-name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={pokemon.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              {/* <div className="form-group">
                <label className="form-name">Type</label>
                <select onChange={e => {handleSelect(e)}}>
                  <option value="">Select a type</option>
                  {types.map(type => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <ul><li>{pokemon.type.map(e => e + " ,")}</li></ul>
                </div> */}
              <div className="form-checkbox-container">
                <h4>Tipos</h4>
                <div className="from-checkbox-grid">
                  {types.map((e) => (
                    <div className="from-checkbox">
                      <div className="from-checkbox-input">
                        <input
                          value={e.id}
                          type="checkbox"
                          onChange={(e) => {
                            handleSelect(e);
                          }}
                        />
                        {e.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-name">Life</label>
                <input
                  type="number"
                  className="form-control"
                  id="life"
                  name="life"
                  value={pokemon.life}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-name">Attack</label>
                <input
                  type="number"
                  className="form-control"
                  id="attack"
                  name="attack"
                  value={pokemon.attack}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-name">Defense</label>
                <input
                  type="number"
                  className="form-control"
                  id="defense"
                  name="defense"
                  value={pokemon.defense}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-name">Speed</label>
                <input
                  type="number"
                  className="form-control"
                  id="speed"
                  name="speed"
                  value={pokemon.speed}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-name">Height</label>
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  name="height"
                  value={pokemon.height}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-name">Weight</label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={pokemon.weight}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-name">Image</label>
                <input
                  type="url"
                  className="form-control"
                  id="img"
                  name="img"
                  value={pokemon.img}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <button
                type="submit"
                className="form-btn form-btn-primary form-btn-block"
              >
                Create Pokemon
              </button>
            </form>
            {error && (
              <div className="form-alert form-alert-danger">
                TODOS LOS CAMPOS SON OBLIGATORIOS
              </div>
            )}
            <Link to="/home">
              <button className="form-btn form-btn-secondary form-btn-block">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* {pokemon.type.map(e =>
        <div ClassName = 'divOcc'>
          <p>{e}</p>
          <button onClick={e => {handleDelete(e)}}>X</button>
          </div> )}
          {console.log(pokemon)} */}
    </Fragment>
  );
}
