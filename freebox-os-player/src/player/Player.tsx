import React from 'react';
import './Player.css';
import {useLocation, useSearchParams} from "react-router-dom";
import {ItemType} from "../common/ItemType.enum";
import VideoPlayer from "./video/VideoPlayer";
import TextPlayer from "./text/TextPlayer";
import ImagePlayer from "./image/ImagePlayer";
import {Item} from "../common/Item.interface";

interface Props {
}

interface State {
}

export default function Player(props: Props) {

  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function getType(): ItemType | undefined {
    let pathname = location.pathname
    let search = location.search
    if (!search) {
      return undefined;
    }
    const firstQueryParam: ItemType = searchParams.keys().next().value;
    console.log('firstQueryParam=' + firstQueryParam)
    return firstQueryParam;
  }

  function getUrl(): string | undefined {
    console.log(location.pathname);
    return '';
  }

  function getItem(): Item {
    return {
      type: getType(),
      url: getUrl(),
    }
  }

  function getPlayer() {
    const item: Item = getItem()
    switch (item.type) {
      case ItemType.VIDEO:
        return <VideoPlayer/>
      case ItemType.IMAGE:
        return <ImagePlayer/>
      case ItemType.TEXT:
        return <TextPlayer/>
      default:
        return <div>NOTHING TO SHOWW</div>
    }
  }

  return (
    <div className="Player">
      {getPlayer()}
    </div>
  );
}
