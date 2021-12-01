import React from 'react'
import  './styles/Card.css';
//-----------------------------------------------------


export default function Card({image, name, type}) {
  return (
   
      <div className="card-block">
        <h2>{name}</h2>
        <img src={image} alt={name} width="200px" height="250px" />
        {Array.isArray(type) ?
            type.map(tipo => (
            <h4 className="pokemon_tipo">{tipo.name}</h4>)): 
            type ? (<h4 className="pokemon_tipo">{type}</h4>) : (<h4 className="pokemon_tipo"> Sin Tipo</h4>)
        }
      </div> 
    
  );
}