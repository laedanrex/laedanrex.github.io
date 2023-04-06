import React from 'react';
import './NavigationItem.css';
import {useLocation, useNavigate} from "react-router-dom";
import {ItemType} from "../../common/ItemType.enum";
import {Item} from "../../common/Item.interface";

interface Props {
  item: Item
}

interface State {
}

export default function NavigationItem(props: Props) {

  let navigate = useNavigate() // extract navigation prop here
  let location = useLocation();

  function getPath(): string {
    const item = props.item;
    console.log('clic on ' + JSON.stringify(item))
    let pathname = location.pathname
    if (pathname.charAt(pathname.length - 1) == '/') {
      pathname = pathname.substring(0, pathname.length - 1);
    }
    switch (item.type) {
      case ItemType.FOLDER:
        return pathname + '/' + item.name
      case ItemType.TEXT:
        return pathname + '?' + ItemType.TEXT + '=' + item.name
      case ItemType.IMAGE:
        return pathname + '?' + ItemType.IMAGE + '=' + item.name
      case ItemType.VIDEO:
        return pathname + '?' + ItemType.VIDEO + '=' + item.name
      case ItemType.OCTET_STREAM:
        return pathname + '?' + ItemType.VIDEO + '=' + item.name
      default:
        console.error('Unkonw item type error :' + item.type)
        return pathname;
    }
  }

  function routeChange() {
    let path = getPath();
    console.log('path = ' + path)
    navigate(path)
  }

  // <div className="NavigationItem" onClick={() => this.props.handleClick(this.props.item)}>

  return (
    <div className="NavigationItem" onClick={routeChange}>
      {props.item.name}
    </div>
  )
}
