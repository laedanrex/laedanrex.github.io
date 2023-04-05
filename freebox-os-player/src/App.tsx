import React from 'react';
import './App.css';
import NavigationList from "./navigation/NavigationList";
import Player from "./player/Player";
import {Item, ItemType} from "./navigation/item/item.interface";
import {useLocation} from "react-router-dom";

interface Props {
}

interface State {
}

function clickOnItem(item: Item) {
  console.log('clic on ' + JSON.stringify(item))
  switch (item.type) {
    case ItemType.FOLDER:
      // TODO ROUTING
      break;
    case ItemType.OCTET_STREAM:
      // start player
      // add to
      break;
    case ItemType.TEXT:

      break;
    case ItemType.IMAGE:

      break;
    case ItemType.VIDEO:

      break;
    default:
      console.error('Unkonw item type error :' + item.type)
  }
}

export default function App() {
  const location = useLocation();
  console.log(location)
  return (
    <div className="App">
      <div className={"left"}>
        <Player/>
      </div>
      <div className={"right"}>
        <NavigationList location={location} handleClick={(item) => clickOnItem(item)}/>
      </div>
    </div>
  );
}
