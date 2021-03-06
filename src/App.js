import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Home from './components/Home';
import New from './components/New';
import JoinFriend from './components/JoinFriend';
import Game from './components/Game';
import Donate from './components/Donate';

class App extends Component {

  render(){

  return (
    <BrowserRouter>
      <React.Fragment>  
        <Route exact path='/' component={Home} />       
        <Route exact path='/new' component={New} />       
        <Route exact path='/join-friend' component={JoinFriend} />       
        <Route exact path='/game' component={Game} />       
      </React.Fragment>
      <footer>
        <Donate />
      </footer>
    </BrowserRouter> 
  );
}
}

export default App;
