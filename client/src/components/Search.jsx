import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../actions';

export default function Search(setPage) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    //const [page, setPage] = useState(0);

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        setPage(0);
        console.log(name);
      }

      function handleSubmit(e) {
        e.preventDefault();
        dispatch(getByName(name));
        setPage(0);
        setName("");
      }

    return (
        <div className="container">
          <input id="formulario" value={name}
            type="text"
           
            placeholder="Buscar pokemon..."           
            onChange={e => {handleInputChange(e)}}            
          />
          
          <button type="submit" onClick={e => {handleSubmit(e)}}>Buscar</button>   
        </div>
    );
}

