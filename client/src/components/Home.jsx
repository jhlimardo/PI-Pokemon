import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'
import  './styles/Card.css';
import './styles/Spinner.css';
import logo from './img/logo1.jpg';



export default function Home() {
    const dispatch = useDispatch()
    const AllPokemons = useSelector(state => state.pokemons)
    const loading = useSelector((state) => state.loading);

    // useEffect(() => {
    //     dispatch(getPokemons())
    // }, [dispatch])


    useEffect(() => {
        if (!AllPokemons.length && !loading.loading) {
            dispatch(getPokemons())
        }
    }, [dispatch, AllPokemons.length, loading.loading])
    


function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
}

return (
    <div>
        <Link to="/pokemon">Crear Pokemon</Link>
        <br/>
        <img src={logo} alt="Pokemon" width="200"/>
        <br/>
        <button onClick={e => {handleClick(e)}}>
        Get Pokemons Again
        </button>
        <div>
            <select>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select>
                <option value='all'>Todos</option>
                <option value='created'>Creados</option>
                <option value='api'>Existentes</option>
            </select>
            <div className="card-content">
            {loading.loading ?
             <div class="lds-dual-ring"></div> :    
            AllPokemons?.map((e) => (   
                        
                <Link className = "Link" to={"/home/" + e.id}  >
                    <Card 
                    name={e.name}
                    image={e.img}
                    type={e.types} />
                </Link>
               
            )
            
            )
            }

            </div>
            </div>

    </div>
)
}