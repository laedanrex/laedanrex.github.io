import React, {Component} from 'react';
import './NavigationList.css';
import NavigationItem from "./item/NavigationItem";
import axios from "axios";
import {Link} from "react-router-dom";
import {Item} from "../common/Item.interface";
import {ItemType} from "../common/ItemType.enum";


interface Props {
}

interface State {
  loaded: boolean;
  totalReactPackages;
  errorMessage;

}

export default function NavigationList(props: Props) {
  return <NavigationListComponent/> //pass to your component.
}

export class NavigationListComponent extends Component<Props, State> {

  shareUrl = 'http://88.170.27.234:47360/share/EabF5eSZFCG96ZyX/';
  shareUrlEnd = '/share/EdOVgDcikGcJUvKU/';
  itemList: Array<Item> = []

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    // TODO load only if first ?
    this.getItemsFromShare()
    this.setState({loaded: true})
  }

  extractTYPE(item: Item, line: string) {
    const matches = line.match(".*<div class=\"([^\"]+)\">.*");
    if (matches) {
      item.classes = matches[1];
      // file-icon-sprite-default file-icon-inode file-icon-inode_directory
      // file-icon-sprite-default file-icon-application file-icon-application_octet-stream
      // file-icon-sprite-default file-icon-text file-icon-text_html
      // file-icon-sprite-default file-icon-image file-icon-image_jpeg
      // file-icon-sprite-default file-icon-video file-icon-video_mp
      if (item.classes.indexOf("file-icon-inode") > -1) {
        item.type = ItemType.FOLDER
      } else if (item.classes.indexOf("file-icon-application") > -1) {
        item.type = ItemType.OCTET_STREAM
      } else if (item.classes.indexOf("file-icon-text") > -1) {
        item.type = ItemType.TEXT
      } else if (item.classes.indexOf("file-icon-image") > -1) {
        item.type = ItemType.IMAGE
      } else if (item.classes.indexOf("file-icon-video") > -1) {
        item.type = ItemType.VIDEO
      }
    }
  }

  extractNAME(item: Item, line: string) {
    const matches = line.match(".*<td><a href=\"([^\"]+)\">([^<]+)<.*");
    if (matches) {
      item.url = matches[1];
      item.name = matches[2];
    }
  }

  extractSIZE(item: Item, line: string) {
    const matches = line.match(".*<td[^>]*>([^<]+)<.*");
    if (matches) {
      item.size = matches[1];
    }
  }

  extractDATE(item: Item, line: string) {
    const matches = line.match(".*<td[^>]*>([^<]+)<.*");
    if (matches) {
      item.date = matches[1];
    }
  }

  extractDataFromLines(html: string) {
    let data = html.split('\n');
    for (let i = 0; i < data.length; i++) {
      let line = data[i];
      if (!line.startsWith('              <td>')) {
        continue;
      }
      const item: Item = {};
      // ----------------------- 1  TYPE
      this.extractTYPE(item, data[i]);
      // ----------------------- 2  NAME
      i++;
      this.extractNAME(item, data[i]);
      // ----------------------- 3 SIZE
      i++;
      this.extractSIZE(item, data[i]);
      // ----------------------- 4 DATE
      i++;
      this.extractDATE(item, data[i]);
      // -----------------------
      this.itemList.push(item);
      console.log(item)
    }
  }

  //TODO add navigation end url
  getItemsFromShare() {
    // see proxy in package.json
    axios.get(this.shareUrlEnd)
      .then(response => {
        this.setState({totalReactPackages: response.data.total});
        this.extractDataFromLines(response.data);
      })
      .catch(error => {
        this.setState({errorMessage: error.message});
        console.error('There was an error while getting links!', error);
      });
  }

  render() {
    return (
      <div className="NavigationList">
        <nav>
          <Link to="/">ACCUEIL</Link>
          {this.itemList.map((item: Item) => (
            <NavigationItem item={item} key={item.name}/>
          ))}
        </nav>
      </div>
    );
  }

}
