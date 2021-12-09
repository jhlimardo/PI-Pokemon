
// import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import React from 'react';
import NavBar from './components/NavBar';
import Detalle from './components/Detalle';
import Form from './components/Form';




function App() {
  return ( 
    <BrowserRouter>     
    <div className="App">      
      <Switch>        
        <Route exact path='/' component={Landing}  />
        <>
         <NavBar />
        <Route exact path='/home' component={Home}  />
        <Route exact path='/home/:id' component={Detalle}  />
        <Route exact path='/create' component={Form}  />        
       </>
       </Switch>       
    </div>
    </BrowserRouter>
  );
}

export default App;
