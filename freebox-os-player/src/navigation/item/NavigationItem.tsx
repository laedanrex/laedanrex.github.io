import React, {Component} from 'react';
import './NavigationItem.css';
import {useLocation, useNavigate} from "react-router-dom";
import {Item, ItemType} from "./item.interface";

interface Props {
  item: Item;
  handleClick;
}

interface State {
}

export default class NavigationItem extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  getPath(pathname: string): string {
    const item = this.props.item;
    console.log('clic on ' + JSON.stringify(item))
    switch (item.type) {
      case ItemType.FOLDER:
        return pathname + '/' + item.name
      case ItemType.TEXT:
        return pathname + '?text=' + item.name
      case ItemType.IMAGE:
        return pathname + '?image=' + item.name
      case ItemType.VIDEO:
        return pathname + '?video=' + item.name
      case ItemType.OCTET_STREAM:
        return pathname + '?video=' + item.name
      default:
        console.error('Unkonw item type error :' + item.type)
        return pathname;
    }
  }

  navigate = useNavigate();

  routeChange = () => {
    const location = useLocation();
    let path = this.getPath(location.pathname);
    console.log('path = ' + path)
    this.navigate(path);
  }

  // <div className="NavigationItem" onClick={() => this.props.handleClick(this.props.item)}>

  render() {
    return (
      <div className="NavigationItem" onClick={this.routeChange}>
        {this.props.item.name}
      </div>
    );
  }

}
