import React, { Component } from 'react';
import './App.css';
import Game from './Game.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}
export default App;