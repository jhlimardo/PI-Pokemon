import React from "react";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./styles/NavBar.css";

export default function Navbar() {
  return (
    <div>
      <header className="navbar-header">
        <Link to="/" className="navbar-links">
          <div className="navbar-logo-img">
            <img src={logo} alt="Pokemon" width="200" />
          </div>
        </Link>
        <div className="navbar-boton-content">
          
            <Link to="/home" className="navbar-links">
              <button>Home</button>
            </Link>

            <Link to="/create" className="navbar-links">
              <button>Crear Pokemon</button>
            </Link>
          
        </div>
      </header>
    </div>
  );
}
