import React from 'react';
import './App.css';
import NavigationList from "./navigation/NavigationList";
import Player from "./player/Player";

function App() {
  return (
    <div className="App">
      <div className={"left"}>
        <Player/>
      </div>
      <div className={"right"}>
        <NavigationList/>
      </div>
    </div>
  );
}

export default App;
