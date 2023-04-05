import React, {Component} from 'react';
import './NavigationList.css';
import NavigationItem from "./item/NavigationItem";
import axios from "axios";
import {Item, ItemType} from "./item/item.interface";
import {Link} from "react-router-dom";


interface Props {
  handleClick;
  location;
}

interface State {
  loaded: boolean;
  totalReactPackages;
  errorMessage;

}

export default class NavigationList extends Component<Props, State> {

  shareUrl = 'http://88.170.27.234:47360/share/EabF5eSZFCG96ZyX/';
  shareUrlEnd = '/share/V1uMAWXS_LvGBZVV/';
  itemList: Array<Item> = []

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    // TODO load only if first ?
    console.log(this.props.location)
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
          {this.itemList.map((listItem: Item) => (
            <NavigationItem item={listItem} key={listItem.name}
                            handleClick={(item) => this.props.handleClick(item)}
            />
          ))}
        </nav>
      </div>
    );
  }

}
