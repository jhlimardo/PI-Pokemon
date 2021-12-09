import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Landing.css';
//import logo from './img/logo.png';


export default function Landing() {
    return (
        <div className="landing-full">
            {/* <img src={logo} alt="Pokemon" width="400" margin="0"/> */}
            {/* <h1>Start</h1> */}
            <div> 
                <div className="landing-content">
                    {/* <h3>Start</h3> */}
                    <Link to="/home">
                    <h3>Start</h3>
                        {/* <button>Start</button> */}
                    </Link>
                </div> 
             </div>
        </div>


                  
      );
    }


