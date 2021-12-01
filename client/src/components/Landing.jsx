import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Landing.css';

export default function Landing() {
    return (
        <div className="full">
            <div> 
                <div className="content">
                    <h1>Welcome to</h1>
                    <Link to="/Home">
                        <button>Start</button>
                    </Link>
                </div> 
             </div>
        </div>


                  
      );
    }


