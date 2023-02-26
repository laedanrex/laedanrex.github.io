import React, {Component} from 'react';
import './NavigationItem.css';
import {Item} from "./item.interface";

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

  render() {
    return (
      <div className="NavigationItem" onClick={() => this.props.handleClick(this.props.item)}>
        {this.props.item.name}
      </div>
    );
  }

}
