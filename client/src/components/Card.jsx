import React from 'react'
import  './styles/Card.css';
//-----------------------------------------------------


export default function Card({image, name, type}) {
  return (
   
      <div className="card-block">
        <h3 className="card-title">{name}</h3>
          <div className="card-image-container">
            <img className="card-image-detail" src={`${image}`} alt={name} width="100px" height="125px" />
          </div>
            {Array.isArray(type) ?
              type.map(t => (
                <div className="card-poke-type">
              <h5 className="card-poke-h5">{t.name}</h5></div>)
              ): 
              type ? (<h5 className="card-poke-h5">{type}</h5>) : (<h5 className="card-poke-h5"> Sin Tipo</h5>)
          }
          </div> 
    
  );
}